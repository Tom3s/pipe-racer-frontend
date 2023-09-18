import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PROFILE_PICTURE_URL, UPLOAD_PROFILE_PICTURE_URL, USER_URL } from "../Global/UrlBuilder";
import { Button, Form, Image, InputGroup } from "react-bootstrap";

export const ProfilePage = () => {

	const navigate = useNavigate();

	const location = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();
	const [userId, setUserId] = useState(searchParams.get("id") || "");
	const [user, setUser] = useState({} as any);
	const [loading, setLoading] = useState(true);
	const [selectedFile, setSelectedFile] = useState(null);
	const [response, setResponse] = useState("");
	const [profilePictureUrl, setProfilePictureUrl] = useState("");

	const [redirect, setRedirect] = useState(<Fragment />);

	useEffect(() => {
		if (userId === "") {
			setTimeout(() => {
				setRedirect(<Navigate to="/home" />);
			}, 3000);
		}
	}, []);

	useEffect(() => {
		setUserId(searchParams.get("id") || "");
	}, [location]);

	useEffect(() => {
		if (userId !== "") {
			fetch(USER_URL(userId))
				.then(response => response.json())
				.then(data => {
					setUser(data);
					setLoading(false);
					setProfilePictureUrl(data.profilePictureUrl);
				});
		}
	}, [userId]);

	const handleSubmit = (event: any) => {
		// setLoading(true);
		setProfilePictureUrl(PROFILE_PICTURE_URL("def"));
		event.preventDefault();
		fetch(UPLOAD_PROFILE_PICTURE_URL,
			{
				method: "POST",
				headers: {
					"Content-Type": "image/png",
					"Session-Token": localStorage.getItem("sessionToken") || ""
				},
				body: selectedFile
			}
		)
			.then(async (res) => {
				if (res.status === 200) {
					setResponse(await res.text());
					setTimeout(() => {
						// navigate("/profile?id=" + localStorage.getItem("userId"));
						window.location.reload();
					});
					return;
				}

				setResponse(await res.text());
					
			});
	};

	const handleFileChange = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	const getProfilePictureUploaders = () => {
		return (
			<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formFileSm" className="mb-3" >
						<Form.Label>Update Profile Picture</Form.Label>
						<InputGroup className="mb-3">
							<Form.Control
								type="file"
								size="sm"
								onChange={handleFileChange} // Handle file selection
							/>
							<Button variant="dark" type="submit"> Upload </Button>
						</InputGroup>
						<Form.Text muted>
							{response}
						</Form.Text>

					</Form.Group>
				</Form>
		)
	};

	return (
		<Fragment>
			<div className="form_div" style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",

			}}>
				{/* <img src={user.profilePictureUrl} alt="Profile Picture" style={{
					width: "200px",
					height: "200px",
					borderRadius: "5%",
					marginBottom: "20px"
				}} /> */}
				{
					loading ?
						<Fragment /> :
						<Image src={profilePictureUrl} style={{
							width: "200px",
							height: "200px",
							borderRadius: "5%",
							marginBottom: "20px"
						}} />
				}
				<h1>{user.username}</h1>

				{
					userId === localStorage.getItem("userId") ?
						getProfilePictureUploaders() :
						<Fragment />
				}
				
			</div>
		</Fragment>
	)
};