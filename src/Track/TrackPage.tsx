import { Fragment, useEffect, useState } from "react";
import { LEADERBOARD_LAPS_URL, LEADERBOARD_URL, TRACKS_URL } from "../Global/UrlBuilder";
import { useSearchParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { timeStringFromTicks } from "../Global/TimeStringFromTicks";

export const TrackPage = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const [track, setTrack] = useState({} as any);
	const [times, setTimes] = useState([] as any);
	const [laps, setLaps] = useState([] as any);
	const [responseText, setResponseText] = useState("");

	const [loadingTrack, setLoadingTrack] = useState(true);
	const [loadingTimes, setLoadingTimes] = useState(true);
	const [loadingLaps, setLoadingLaps] = useState(true);

	const [trackId, setTrackId] = useState(searchParams.get("id") || "");



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
				console.log(data);
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
									<a href={"/profile?id=" + time.user._id}>{time.user.username}</a>
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

	const getMainContent = () => {
		return (
			<Fragment>
				{
					responseText !== "" ?
						<h1>{responseText}</h1> :
				<Fragment>

				
				<h1>{track?.name}</h1>
				<h2>by: {track?.author.username}</h2>
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

				<h3>Leaderboard</h3>
				{getTimeLeaderBoard()}
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