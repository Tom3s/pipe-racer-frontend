import { Fragment, useState } from "react";
import { COMMENTS_URL, PROFILE_PICTURE_URL, RATE_COMMENT_URL } from "../Global/UrlBuilder";
import { Button } from "react-bootstrap";
import { CommentInput } from "./CommentInput";

export function Comment(props: any): JSX.Element {
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
	const [ratingValue, setRatingValue] = useState(rating);

	function changeReply() {
		setReply(!reply);
	}

	console.log(indent);

	function deleteComment() {
		// console.log("delete");
		if (window.confirm("Are you sure you want to delete this comment?")) {
			fetch(COMMENTS_URL(id), {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Session-Token": localStorage.getItem("sessionToken") || ""
				},
			})
				.then(async (res) => {
					if (res.status === 200) {
						alert("Comment deleted!");
						window.location.reload();
						return;
					}
					alert(await res.text());
				});
		}
	}

	function submitRating(newRating: number) {
		fetch(RATE_COMMENT_URL(id), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Session-Token": localStorage.getItem("sessionToken") || ""
			},
			body: JSON.stringify({
				"rating": newRating
			})
		})
			.then(async (res) => {
				if (res.status === 200) {
					// alert("Rating submitted!");
					// window.location.reload();
					setRatingValue((await res.json())?.rating);
					return;
				}
				alert(await res.text());
			});
	}

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
							// flexGrow: "1"
						}}
					/>
					<h4 style={{ flexGrow: "10" }}>{username}:</h4>
					{
						localStorage.getItem("userId") === userId &&
						<Button onClick={deleteComment} variant="danger"> <i className="fa fa-trash" /> </Button>
					}
				</div>
				<hr />
				{comment}
				<hr />
				<div style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
				}}>
					<span style={{ marginTop: "5px" }}>Rating: {ratingValue}</span>
					{
						localStorage.getItem("userId") !== null &&
						<Fragment>
							<Button style={{ marginLeft: "10px" }} onClick={() => submitRating(1)} variant="success"> +1 </Button>
							<Button style={{ marginLeft: "10px" }} onClick={() => submitRating(-1)} variant="danger"> -1 </Button>
							<Button
								style={{ marginLeft: "10px" }}
								variant="light"
								onClick={changeReply}
							> Reply</Button>
						</Fragment>
					}
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