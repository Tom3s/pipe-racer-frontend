import { Fragment, useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Nav, Navbar } from "react-bootstrap"
// import UserDetailsOffCanvas from "./userDetails"
import { useNavigate } from "react-router-dom"
import { destroyLocalSessionDetails } from "../Global/SessionManager";
import { Title } from "./Title";
import { isWindows, osName } from "react-device-detect";

export const NavigationBar = () => {

    const navigate = useNavigate();

	const defaultDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer.exe";
	const linuxDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer.x86_64";
	const macOsDownloadLink = defaultDownloadLink;
	const [downloadLink, setDownloadLink] = useState(defaultDownloadLink);

	useEffect(() => {
		const os = osName;
		switch (os) {
			case "Windows":
				setDownloadLink(defaultDownloadLink);
				break;
			case "Linux":
				setDownloadLink(linuxDownloadLink);
				break;
			case "Mac OS":
				setDownloadLink(macOsDownloadLink);
				break;
			default:
				setDownloadLink(defaultDownloadLink);
				break;
		}
	}, []);

    return (
        <Fragment>
            <Navbar bg="black" variant="dark" sticky="top">
                <Container>
                    {/* <UserDetailsOffCanvas /> */}
                    <Navbar.Brand onClick={() => navigate("/home")}>PIPE RACER</Navbar.Brand>
					<div style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Button variant="dark"
					style={{
						marginRight: "10px",
						fontSize: "22px",
						padding: "0px",
						width: "40px",
						height: "40px",
					}}
					href={downloadLink}
					><i className="fa fa-download" /></Button>
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
                    <Navbar.Toggle />

					<Nav.Link onClick={() => navigate("/tracks")}>Tracks</Nav.Link>
					<Nav.Link 
					href="https://github.com/Tom3s/pipe-racer-frontend/blob/main/src/StaticPages/EditorGuideMarkdown.md"
					>Editor Guide</Nav.Link>
					
					<Nav.Link onClick={() => navigate("/ranks")}>Ranks</Nav.Link>

                    {
                        localStorage.getItem('sessionToken') !== null &&
                        <Navbar.Text>
                            Signed in as: <a onClick={() => navigate("/profile?id=" + localStorage.getItem('userId'))}>{localStorage.getItem('username')}</a>
                        </Navbar.Text>
                    }
                    {
                        localStorage.getItem('sessionToken') === null ?
                            <Fragment>
                                <ButtonGroup className="me-2">
                                    <Button variant="dark" onClick={() => navigate("/register")}>Register</Button>
                                    <Button variant="dark" onClick={() => navigate("/login")}>Login</Button>
                                </ButtonGroup>
                            </Fragment>
                            :
                            <Button variant="dark" onClick={() => { destroyLocalSessionDetails(); navigate("/"); }}>Logout</Button>

                    }
                </Container>
            </Navbar>
        </Fragment>
    )
};