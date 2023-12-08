import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PROFILE_PICTURE_URL, UPLOAD_PROFILE_PICTURE_URL, USER_STATS_URL, USER_URL } from "../Global/UrlBuilder";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { refreshSessionDetails } from "../Global/SessionManager";

export const ProfilePage = () => {

	refreshSessionDetails();

	const navigate = useNavigate();

	const location = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();
	const [userId, setUserId] = useState(searchParams.get("id") || "");
	const [user, setUser] = useState({} as any);
	const [loading, setLoading] = useState(true);
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


	const getHours = (minutes: number): string => {
		const hours = minutes / 60;
		if (hours <= 10) {
			return hours.toFixed(0) + " h" + " " + (minutes % 60).toFixed(0) + " m";
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
				marginTop: "10px",
			}}>
				<h3>Stats</h3>
				<p>Global Rank: {userStats?.globalScore?.globalRank}</p>
				<p>Global Score: {userStats?.globalScore?.score}</p>
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
								<Image src={profilePictureUrl} className="profile-pic" />

								<h1>{user.username}{
									user?.guest &&
									" (Guest)"
								}</h1>

								{
									userId === localStorage.getItem("userId") ?
										<Button variant="dark" onClick={() => navigate("/editProfile")}>Edit Profile</Button> :
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