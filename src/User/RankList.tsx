import { useEffect, useState } from 'react';
import '../Auth/FormStyle.css'
import { Table } from 'react-bootstrap';
import { RANKS_URL } from '../Global/UrlBuilder';
import { Navigate, useNavigate } from 'react-router-dom';

export const RankList = () => {

	const navigate = useNavigate();

	const [rankList, setRankList] = useState([] as any);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(RANKS_URL)
		.then(response => response.json())
		.then(data => {
			setRankList(data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="form_div" style={{
			// width: "80vw",
		}}>
			<h1>RankList</h1>
			<Table striped bordered hover variant="dark" responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Player</th>
						<th>Rating</th>
						<th>Time Score</th>
						<th>Lap Score</th>
					</tr>
				</thead>
				<tbody>
					{rankList.map((rank: any, index: number) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									<a onClick={() => navigate('/profile?id=' + rank.user._id)}>{rank.user.username}</a>
								</td>
								<td>{rank.score}</td>
								<td>{rank.scoreTime}</td>
								<td>{rank.scoreLaps}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</div>
	)
};