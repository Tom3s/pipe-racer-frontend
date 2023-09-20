import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PROFILE_PICTURE_URL, UPLOAD_PROFILE_PICTURE_URL, USER_STATS_URL, USER_URL } from "../Global/UrlBuilder";
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
	const [userStats, setUserStats] = useState({} as any);

	const [found, setFound] = useState(false);

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
					setFound(data.username !== undefined);
					setProfilePictureUrl(data.profilePictureUrl);
				});

			fetch(USER_STATS_URL(userId))
				.then(response => response.json())
				.then(data => {
					setUserStats(data);
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

	const getHours = (minutes: number): string => {
		const hours = minutes / 60;
		if (hours <= 10) {
			return hours.toFixed(2) + " h";
		}
		return hours.toFixed(0) + " h";
	}

	const getProfileStats = () => {
		// {
		// 	"user": "6508760967ee3315fb640e81",
		// 	"mostPlayedTrack": null,
		// 	"totalPlaytime": 0,
		// 	"ingamePlaytime": 0,
		// 	"editorPlaytime": 0,
		// 	"tracksUploaded": 0,
		// 	"tracksPlayed": 0,
		// 	"tracksRated": 0,
		// 	"totalAttempts": 0,
		// 	"totalFinishes": 0
		// }
		return (
			<div style={{
				display: "flex",
				flexDirection: "column",
				// alignItems: "start",
				// justifyContent: "center",
				backgroundColor: "rgba(255, 255, 255, 0.05)",
				padding: "10px",
				borderRadius: "10px",
			}}>
				<h3>Stats</h3>
				<p>Total Playtime: {getHours(userStats.totalPlaytime)}</p>
				<hr />
				<p>Ingame Playtime: {getHours(userStats.ingamePlaytime)}</p>
				<p>Most Played Track: <a onClick={() => navigate("/track?id=" + userStats.mostPlayedTrack._id)}>{userStats.mostPlayedTrack?.name}</a></p>
				<p>Total Attempts: {userStats.totalAttempts}</p>
				<p>Total Finishes: {userStats.totalFinishes}</p>
				<p>Tracks Played: {userStats.tracksPlayed}</p>
				<hr />
				<p>Editor Playtime: {getHours(userStats.editorPlaytime)}</p>
				<p>Total Objects Placed: {userStats.placedAll}</p>
				<p>Tracks Uploaded: {userStats.tracksUploaded}</p>
				<p>Tracks Rated: {userStats.tracksRated}</p>
			</div>
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
				{
					loading ?
						<Fragment /> :
						found ?
							<Fragment>
								<Image src={profilePictureUrl} style={{
									width: "200px",
									height: "200px",
									borderRadius: "5%",
									marginBottom: "20px"
								}} />

								<h1>{user.username}{
									user?.guest &&
									" (Guest)"
								}</h1>

								{
									userId === localStorage.getItem("userId") ?
										getProfilePictureUploaders() :
										<Fragment />
								}

								{getProfileStats()}
							</Fragment>
							:
							<h1>User not found</h1>
				}
			</div>
		</Fragment>
	)
};