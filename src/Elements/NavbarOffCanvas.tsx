import { useState, Fragment, useRef, useEffect } from "react";
import { Offcanvas, ListGroup, Button, Row, Col, Overlay, OverlayTrigger, Tooltip, ButtonGroup } from "react-bootstrap";
import { osName } from "react-device-detect";
// import { destroyLocalSessionDetails } from "../models/entities";
import { useNavigate } from "react-router-dom";
import { destroyLocalSessionDetails } from "../Global/SessionManager";

export const NavbarOffCanvas = () => {

	const navigate = useNavigate();

	const [showOffCanvas, setShowOffCanvas] = useState(false);

	const handleCloseOffCanvas = () => setShowOffCanvas(false);
	const handleShowOffCanvas = () => setShowOffCanvas(true);

	const [showCopyOverlay, setShowCopyOverlay] = useState(false);
	const copyTarget = useRef(null);



	return (
		<Fragment>
			<Button variant="dark" onClick={handleShowOffCanvas}>
				<i className="fa fa-bars" />
			</Button>
			<Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas}
				style={{
					backgroundColor: "#222",

				}}
			>
				{
					<Fragment>
						<Offcanvas.Header closeVariant="white" closeButton >
							<Offcanvas.Title>Menu</Offcanvas.Title>
						</Offcanvas.Header>
						<Fragment />
						<hr />
						<Offcanvas.Body style={{ textAlign: "center" }}>

							{
								localStorage.getItem('sessionToken') !== null ?
									<Fragment>
										Signed in as: <a onClick={() => {
											handleCloseOffCanvas();
											navigate("/profile?id=" + localStorage.getItem('userId'))
										}}>{localStorage.getItem('username')}</a>
										<br />
										<a onClick={() => {
											handleCloseOffCanvas();
											navigate("/editProfile");
										}}>Edit Profile</a>

									</Fragment>
									:
									<Fragment>
										Not signed in
									</Fragment>
							}

							<hr />
							<a onClick={() => {
								handleCloseOffCanvas();
								navigate("/home")
							}}>Home</a>
							<hr />
							<a onClick={() => {
								handleCloseOffCanvas();
								navigate("/tracks")
							}}>Tracks</a>
							<hr />
							<a
								href="https://github.com/Tom3s/pipe-racer-frontend/blob/main/src/StaticPages/EditorGuideMarkdown.md"
							>Editor Guide</a>
							<hr />

							<a onClick={() => {
								handleCloseOffCanvas();
								navigate("/ranks")
							}}>Ranks</a>
							<span style={{
								marginBottom: "50px"
							}}> </span>
							<hr />
						</Offcanvas.Body>
					</Fragment>
				}
			</Offcanvas>
		</Fragment>
	);
}