import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SUBMIT_COMMENT_URL } from "../Global/UrlBuilder";

export const CommentInput = (props: any) => {
	const { 
		trackId, 
		indent, 
		parentComment, 
		parentUsername,
		reply,
		...divProps 
	} = props;

	const [comment, setComment] = useState("");

	const onChangeComment = (event: any) => { setComment(event.target.value); };

	function submitComment(event: any) {
		event.preventDefault();

		// console.log(comment);
		const data = {
			"track": trackId,
			"comment": comment,
			"parentComment": parentComment,
		};

		fetch(SUBMIT_COMMENT_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Session-Token": localStorage.getItem("sessionToken") || ""
			},
			body: JSON.stringify(data)
		})
		.then(async (res) => {
			if (res.status === 200) {
				alert("Comment submitted!");
				window.location.reload();
				return;
			}
			alert(await res.text());
		});
	}

	return (
		<Form style={{
			marginLeft: indent * 20 + "px",
		}} onSubmit={submitComment}>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
				<Form.Label>{
					reply ? "Reply to " + parentUsername : "Write Comment"
				}</Form.Label>
				<Form.Control as="textarea" rows={3} placeholder="Comment..." onChange={onChangeComment} />
				<Button style={{
					float: "right",
					marginTop: "10px",
				}} variant="dark" type="submit"> Submit </Button>
			</Form.Group>
		</Form>
	)
}