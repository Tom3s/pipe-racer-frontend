import { Fragment, useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Nav, Navbar } from "react-bootstrap"
// import UserDetailsOffCanvas from "./userDetails"
import { useNavigate } from "react-router-dom"
import { destroyLocalSessionDetails } from "../Global/SessionManager";
import { Title } from "./Title";
import { isWindows, osName } from "react-device-detect";
import { NavbarOffCanvas } from "./NavbarOffCanvas";

export const NavigationBar = () => {
	const navigate = useNavigate();

	const defaultDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer_win64.zip";
	const linuxDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer_linux.zip";
	const macOsDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer_macOS.zip";
	const [downloadLink, setDownloadLink] = useState(defaultDownloadLink);
	const [os, setOs] = useState(osName);

	useEffect(() => {
		const os = osName;
		switch (os) {
			case "Windows":
				setDownloadLink(defaultDownloadLink);
				// setOs(os);
				break;
			case "Linux":
				setDownloadLink(linuxDownloadLink);
				// setOs(os);
				break;
			case "Mac OS":
				setDownloadLink(macOsDownloadLink);
				// setOs(os);
				break;
			default:
				setDownloadLink(defaultDownloadLink);
				setOs("Windows")
				break;
		}
	}, []);
	

	return (
		<Fragment>
				<Navbar bg="black" variant="dark" sticky="top" expand="lg" style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "10px 7vw",
					}}>
					<NavbarOffCanvas />
					{/* <Navbar.Toggle /> */}
					{/* <Navbar.Brand onClick={() => navigate("/home")}>PIPE RACER</Navbar.Brand> */}
					<div >

								<Button variant="dark"
									style={{
										marginRight: "10px",
										fontSize: "22px",
										padding: "0px 10px",
										// width: "40px",
										height: "40px",
									}}
									href={downloadLink}
								><span style={{ fontSize: "15px" }}>{os} </span><i className="fa fa-download" /></Button>
								<Button variant="dark"
									style={{
										marginRight: "10px",
										fontSize: "22px",
										padding: "0px",
										width: "40px",
										height: "40px",
									}}
									href="https://github.com/Tom3s/pipe-racer/releases"
								><i className="fa fa-github" /></Button>
							</div>

					{/* <Nav.Link onClick={() => navigate("/tracks")}>Tracks</Nav.Link>
					<Nav.Link
						href="https://github.com/Tom3s/pipe-racer-frontend/blob/main/src/StaticPages/EditorGuideMarkdown.md"
					>Editor Guide</Nav.Link>

					<Nav.Link onClick={() => navigate("/ranks")}>Ranks</Nav.Link> */}

					{
						localStorage.getItem('sessionToken') !== null &&
						<Navbar.Text>
							Signed in as: <a onClick={() => navigate("/profile?id=" + localStorage.getItem('userId'))}>{localStorage.getItem('username')}</a>
						</Navbar.Text>
					}
					{
						localStorage.getItem('sessionToken') === null ?
							<Fragment>
								<ButtonGroup className="me-2 buttons" >
									<Button variant="dark" onClick={() => navigate("/register")}>Register</Button>
									<Button variant="dark" onClick={() => navigate("/login")}>Login</Button>
								</ButtonGroup>
							</Fragment>
							:
							<Button variant="dark" onClick={() => { destroyLocalSessionDetails(); navigate("/"); }}>Logout</Button>

					}
					{/* </div> */}
				</Navbar>
		</Fragment>
	)
};