import { useEffect, useState } from 'react';
import '../Auth/FormStyle.css'
import { Table } from 'react-bootstrap';
import { TRACKS_URL } from '../Global/UrlBuilder';
import { Navigate, useNavigate } from 'react-router-dom';

export const TrackList = () => {

	const navigate = useNavigate();

	const [trackList, setTrackList] = useState([] as any);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(TRACKS_URL())
		.then(response => response.json())
		.then(data => {
			setTrackList(data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="form_div" style={{
			width: "80vw",
		}}>
			<h1>TrackList</h1>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Track Name</th>
						<th>Author</th>
						<th>Rating</th>
						<th>Downloads</th>
						<th>Upload Date</th>
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
								<td>{track.rating}</td>
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