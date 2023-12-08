import { Fragment, useEffect, useState } from "react";
import { Button, Form, InputGroup, Image, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { PROFILE_PICTURE_URL, UPLOAD_PROFILE_PICTURE_URL, USERS_URL } from "../Global/UrlBuilder";

export const EditProfilePage = () => {

	const navigate = useNavigate();

	const [username, setUsername] = useState(localStorage.getItem("username") || "");
	// TODO: Solve email update logic on backend
	// const [email, setEmail] = useState(""); 
	const [password, setPassword] = useState("");

	const [validUsername, setValidUsername] = useState(false);
	const [validPassword, setValidPassword] = useState(false);

	const [selectedFile, setSelectedFile] = useState(null);
	const [profilePictureUrl, setProfilePictureUrl] = useState("");
	const [response, setResponse] = useState("");

	const onChangeUsername = (event: any) => { setUsername(event.target.value); };
	const onChangePassword = (event: any) => { setPassword(event.target.value); };

	const validatePassword = (): boolean => {
		// one uppercase, one lowercase, and one special character
		const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d@$!%*#?&._\-,])[A-Za-z\d@$!%*#?&._\-,]{8,}$/;
		return regex.test(password);
	}

	const validateUsername = (): boolean => {
		const regex = /^[a-zA-Z0-9-_.]+$/;
		return regex.test(username);
	}

	useEffect(() => {
		setValidPassword(password == "" || validatePassword());
	}, [password]);

	useEffect(() => {
		setValidUsername(username == "" || validateUsername());
	}, [username]);

	const handleSubmitProfilePicture = (event: any) => {
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

	const handleSubmitUsername = (event: any) => {
		event.preventDefault();

		const data = {
			"username": username
		}

		fetch(USERS_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Session-Token": localStorage.getItem("sessionToken") || ""
			},
			body: JSON.stringify(data)
		})
			.then(async (res) => {
				if (res.status === 200) {
					const newUsername = (await res.json()).username;
					setUsername(newUsername);
					localStorage.setItem("username", newUsername);
					setTimeout(() => {
						// navigate("/profile?id=" + localStorage.getItem("userId"));
						window.location.reload();
					});
					return;
				}

				setResponse(await res.text());

			});
	}

	const getProfilePictureUploaders = () => {
		return (
			<Form onSubmit={handleSubmitProfilePicture}>
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
					{/* <Form.Text muted style={{color: "white"}}>
						{response}
					</Form.Text> */}

				</Form.Group>
			</Form>
		)
	};

	const getField = (label: string, placeholder: string, onChange: any, value: any, isInvalid: boolean, isValid: boolean, invalidMessage: string, type: string) => {
		return (
			<Form.Group as={Row} controlId={label}>
				<Form.Label column sm={2}>{label}</Form.Label>
				<InputGroup hasValidation>
					<Form.Control type={type} placeholder={placeholder} required onChange={onChange} value={value} isInvalid={isInvalid} isValid={isValid} />
					<Form.Control.Feedback type="invalid">
						{invalidMessage}
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
		)
	}

	const getUsernameField = () => {
		return getField(
			"Username",
			localStorage.getItem("username") || "",
			onChangeUsername,
			username,
			!validUsername,
			username != "" && validUsername,
			"Username must be at least 1 character long and contain only letters, numbers, and the following characters: -_.",
			"text"
		)
	}

	const getPasswordField = () => {
		return getField(
			"Password",
			"Password",
			onChangePassword,
			password,
			!validPassword,
			password != "" && validPassword,
			"Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one special character/number.",
			"password"
		)
	}

	const getUsernameForm = () => {
		return (
			<Form onSubmit={handleSubmitUsername} style={{display: "flex", flexDirection: "row", alignItems: "flex-end", maxWidth: "500px"}}>
				{getUsernameField()}
				<Button variant="dark" type="submit">
					Update
				</Button>
			</Form>
		)
	}

	const getPasswordForm = () => {
		return (
			<Form onSubmit={handleSubmitUsername} style={{display: "flex", flexDirection: "row", alignItems: "flex-end", maxWidth: "500px"}}>
				{getPasswordField()}
				<Button variant="dark" type="submit">
					Update
				</Button>
			</Form>
		)
	}

	return (
		<Fragment>
			<div className="form_div" style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",

			}}>
				{
					localStorage.getItem("userId") === null ?
						<Navigate to="/home" />
						:
						<Fragment />
				}
				{
					<Fragment>
						<Image src={localStorage.getItem("profilePictureUrl") || ""} className="profile-pic" />

						<h1>{localStorage.getItem("username")}</h1>


						{getProfilePictureUploaders()}

					</Fragment>
				}
				{response}
				{getUsernameForm()}
				{getPasswordForm()}
			</div>
		</Fragment>
	);
}