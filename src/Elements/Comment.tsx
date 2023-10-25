import { Fragment, useState } from "react";
import { PROFILE_PICTURE_URL } from "../Global/UrlBuilder";
import { Button } from "react-bootstrap";
import { CommentInput } from "./CommentInput";

export function Comment(props: any): JSX.Element{
	const { 
		username, 
		userId, 
		comment, 
		trackId, 
		indent, 
		rating,
		id,
		...divProps 
	} = props;

	const [reply, setReply] = useState(false);

	function changeReply() {
		setReply(!reply);
	}

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
				<hr />
				<div style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
				}}>
					<span style={{marginTop: "5px"}}>Rating: {rating}</span>
					<Button style={{marginLeft: "10px"}} variant="success"> +1 </Button>
					<Button style={{marginLeft: "10px"}} variant="danger"> Disagree </Button>
					<Button 
						style={{marginLeft: "10px"}} 
						variant="light"
						onClick={changeReply}
					> Reply</Button>
				</div>
			</div>
			{reply && 
				<CommentInput 
					trackId={trackId}
					indent={indent}
					parentComment={id}
					parentUsername={username}
					reply={true}
				/>
			}

		</Fragment>
	)
};