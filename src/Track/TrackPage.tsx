import { Fragment, useEffect, useState } from "react";
import { LEADERBOARD_LAPS_URL, LEADERBOARD_URL, RATE_URL, TRACKS_URL } from "../Global/UrlBuilder";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form, Table, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { timeStringFromTicks } from "../Global/TimeStringFromTicks";

export const TrackPage = () => {

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();
	const [track, setTrack] = useState({} as any);
	const [times, setTimes] = useState([] as any);
	const [laps, setLaps] = useState([] as any);
	const [responseText, setResponseText] = useState("");

	const [loadingTrack, setLoadingTrack] = useState(true);
	const [loadingTimes, setLoadingTimes] = useState(true);
	const [loadingLaps, setLoadingLaps] = useState(true);

	const [trackId, setTrackId] = useState(searchParams.get("id") || "");

	const [listType, setListType] = useState(1);



	useEffect(() => {

		setLoadingTimes(true);
		setLoadingTrack(true);
		setLoadingLaps(true);

		fetch(TRACKS_URL(trackId))
			.then(async response => {
				if (response.status !== 200) {
					setLoadingTrack(false);
					setResponseText(await response.text());
					return {} as any;
				}
				return response.json();
			})
			.then(data => {
				setTrack(data);
				setLoadingTrack(false);
			});

		fetch(LEADERBOARD_URL(trackId))
			.then(async response => {
				if (response.status !== 200) {
					setLoadingTimes(false);
					// setResponseText(await response.text());
					return [];
				}
				return response.json();
			})
			.then(data => {
				setTimes(data);
				setLoadingTimes(false);
			});

		fetch(LEADERBOARD_LAPS_URL(trackId))
			.then(async response => {
				if (response.status !== 200) {
					setLoadingLaps(false);
					// setResponseText(await response.text());
					return [];
				}
				return response.json()
			})
			.then(data => {
				setLaps(data);
				setLoadingLaps(false);
			});


	}, [trackId]);

	const getTimeLeaderBoard = () => {
		return (
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Time</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{times?.map((time: any, index: number) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									<a onClick={() => navigate("/profile?id=" + time.user._id)}>{time.user.username}</a>
								</td>
								<td>{timeStringFromTicks(time.time)}</td>
								<td>{time.date.split('T')[0]}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}

	const getLapLeaderBoard = () => {
		return (
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Best Lap</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{laps?.map((time: any, index: number) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									<a onClick={() => navigate("/profile?id=" + time.user._id)}>{time.user.username}</a>
								</td>
								<td>{timeStringFromTicks(time.bestLap)}</td>
								<td>{time.date.split('T')[0]}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}

	const getRadioButtons = () => {
		return (
			<ToggleButtonGroup type="radio" name="options" defaultValue={listType} style={{ margin: "10px" }}>
				<ToggleButton variant="outline-secondary" id="tbg-radio-1" value={1} onClick={() => setListType(1)}>Total Times</ToggleButton>
				<ToggleButton variant="outline-secondary" id="tbg-radio-2" value={2} onClick={() => setListType(2)}>Best Laps</ToggleButton>
			</ToggleButtonGroup>
		)
	};

	const [rating, setRating] = useState<number | null>(3);

	const possibleRatings = [0, 1, 2, 3, 4, 5];
	const ratingColors = [
		"#CC0000",
		"#FFAAAA",
		"#FFFFAA",
		"#AAFFAA",
		"#AAFFFF",
		"#AAAAFF",
	]

	const handleRatingClick = (selectedRating: number) => {
		// Toggle the selected rating
		if (rating === selectedRating) {
			setRating(null);
		} else {
			setRating(selectedRating);
		}
	};

	const handleRateSubmit = () => {
		fetch(RATE_URL(trackId), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Session-Token": localStorage.getItem("sessionToken") || ""
			},
			body: JSON.stringify({
				rating: rating
			})
		})
			.then(async (res) => {
				if (res.status === 200) {
					alert("You have rated this track " + rating);
					setTrack({
						...track,
						rating: (await res.json()).rating,
					});
				}
			});
	};

	const getRateComponent = () => {
		return (
			<Fragment>
				<hr />
				<div className="track-rating"
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-evenly",
					}}
				>
					<h3>Rate this track:</h3>
					<div style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>

						<h3>
							<div>
								{possibleRatings.map((number) => (
									<span
										key={number}
										// className={`rating-star ${rating && rating >= number ? "active" : ""}`}
										style={{
											color: rating !== null && rating >= number ? ratingColors[number] : "gray",
											cursor: "pointer",
											margin: "3px",
										}}
										onClick={() => handleRatingClick(number)}
									>
										{number}
									</span>
								))}
							</div>
						</h3>
						<Button onClick={handleRateSubmit} variant="dark" style={{ marginLeft: "20px" }} >
							Rate
						</Button>
					</div>
				</div>
			</Fragment>
		);
	};

	const deleteTrack = () => {
		const answer = window.confirm("Are you sure you want to delete this track? \nThis action cannot be undone.");
		// console.log(answer);
		if (answer) {
			fetch(TRACKS_URL(trackId), {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Session-Token": localStorage.getItem("sessionToken") || ""
				},
			})
				.then(async (res: any) => {
					if (res.status === 200) {
						alert(await res.text())
						navigate("/tracks");
					} else {
						alert(await res.text())
					}
				});
		}
	} 

	const getDeleteButton = () => {
		return (
			localStorage.getItem("userId") === track?.author._id ?
			<Button variant="danger" onClick={deleteTrack}style={{
				height: "fit-content",
				marginRight: "10px",
			}}>
				Delete Track
			</Button>
			:
			<Fragment />
		)
	} 


	const getMainContent = () => {
		return (
			<Fragment>
				{
					responseText !== "" ?
						<h1>{responseText}</h1> :
						<Fragment>

							<div style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}>
								<h1	style={{
									flexGrow: 1,
								}}
								>{track?.name}</h1>
								{getDeleteButton()}
								<Button variant="dark" onClick={() => navigate("/tracks")} style={{
									height: "fit-content",
								}}>
									Back
								</Button>
							</div>
							<h2>by: <a onClick={() => navigate("/profile?id=" + track?.author._id)}>{track?.author.username}</a></h2>
							<hr />
							<div style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}>
								<span>Rating: {track?.rating}/5 - Downloads: {track?.downloads}</span>
								<span>Uploaded: {track?.uploadDate.split('T')[0]}</span>
							</div>
							<hr />

							<div style={{
								display: "flex",
								flexDirection: "row",
								// alignContent: "center",
								alignItems: "center",
							}}>
								<h3>Leaderboard</h3>
								{getRadioButtons()}
							</div>
							{
								listType === 1 ?
									getTimeLeaderBoard() :
									getLapLeaderBoard()
							}
							{
								localStorage.getItem("userId") !== null &&
								getRateComponent()
							}
							
						</Fragment>
				}
			</Fragment>
		)
	};

	return (
		<div className="form_div" style={{
			width: "80vw",
		}}>
			{
				!loadingTimes && !loadingTrack && !loadingLaps ?
					getMainContent() :
					<h1>Loading...</h1>
			}
		</div>
	);
};