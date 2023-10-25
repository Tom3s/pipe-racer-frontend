import { Fragment } from "react";
import { PROFILE_PICTURE_URL } from "../Global/UrlBuilder";

export function Comment(props: any): JSX.Element{
	const { username, userId, comment, trackId, indent, ...divProps } = props;

	console.log(indent);

	return (
		<Fragment>
			<div style={{
				backgroundColor: "#000000aa",
				borderRadius: "5px",
				padding: "10px",
				margin: "5px",
				marginLeft: indent * 20 + "px",
				color: "#dfdfdf",

			}}>
				<div style={{
					display: "flex",
					flexDirection: "row",
				}}
				>
				<img src={PROFILE_PICTURE_URL(userId)} 
					style={{
						height: "35px",
						width: "35px",
						borderRadius: "5px",
						marginRight: "10px",
					}}
				/>
				<h4>{username}:</h4>
				</div>
				<hr />
				{comment}
			</div>

		</Fragment>
	)
};