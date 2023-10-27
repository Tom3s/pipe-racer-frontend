import { useEffect, useState } from 'react';
import '../Auth/FormStyle.css'
import { Table } from 'react-bootstrap';
import { SORTED_TRACKS_URL, TRACKS_URL } from '../Global/UrlBuilder';
import { Navigate, useNavigate } from 'react-router-dom';
import { refreshSessionDetails } from '../Global/SessionManager';

export const TrackList = () => {

	refreshSessionDetails();

	const navigate = useNavigate();

	const [trackList, setTrackList] = useState([] as any);
	const [loading, setLoading] = useState(true);

	// localStorage.setItem("trackSortDirection", "1");
	// const currentSortDirection

	useEffect(() => {
		fetch(TRACKS_URL())
		.then(response => response.json())
		.then(data => {
			setTrackList(data);
			setLoading(false);
		});
	}, []);

	function flipSortDirection() {
		const currentSortDirection = localStorage.getItem("trackSortDirection");
		const newSortDirection = currentSortDirection == "1" ? "-1" : "1";
		console.log(newSortDirection);
		localStorage.setItem("trackSortDirection", newSortDirection);
		return newSortDirection;
	}

	function getDirection() {
		localStorage.setItem("trackSortDirection", "1");
		return "1";
	}

	function sortList(field: string) {
		const sortDirection = localStorage.getItem("trackSortField") == field ? flipSortDirection() : getDirection();
		localStorage.setItem("trackSortField", field);
		fetch(SORTED_TRACKS_URL(field, sortDirection))
		.then(response => response.json())
		.then(data => {
			setTrackList(data);
			setLoading(false);
		});
	}

	function getSortArrow(field: string) {
		if (field != localStorage.getItem("trackSortField")) {
			return " ";
		}
		const sortDirection = localStorage.getItem("trackSortDirection");
		return sortDirection == "1" ? "▲" : "▼";
	}

	return (
		<div className="form_div" style={{
			// width: "80vw",
		}}>
			<h1>Tracks</h1>
			<Table striped bordered hover variant="dark" responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th style={{cursor: "pointer"}} onClick={() => sortList("name")}>Track Name  {getSortArrow("name")}</th>
						<th style={{cursor: "pointer"}} onClick={() => sortList("author")}>Author  {getSortArrow("author")}</th>
						<th style={{cursor: "pointer"}} onClick={() => sortList("rating")}>Rating  {getSortArrow("rating")}</th>
						<th style={{cursor: "pointer"}} onClick={() => sortList("downloads")}><i className='fa fa-download'/>  {getSortArrow("downloads")}</th>
						<th style={{cursor: "pointer"}} onClick={() => sortList("_id")}>Upload Date  {getSortArrow("_id")}</th>
					</tr>
				</thead>
				<tbody>
					{trackList.map((track: any, index: number) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									<a onClick={() => navigate('/track?id=' + track._id)}>{track.name}</a>
								</td>
								<td>
									<a onClick={() => navigate("/profile?id=" + track.author._id)}>{track.author.username}</a>
								</td>
								<td>{track.rating?.toFixed(2)}</td>
								<td>{track.downloads}</td>
								<td>{track.uploadDate.split('T')[0]}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</div>
	)
};