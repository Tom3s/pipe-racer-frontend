import { Fragment } from "react"
import { Button, ButtonGroup, Container, Nav, Navbar } from "react-bootstrap"
// import UserDetailsOffCanvas from "./userDetails"
import { useNavigate } from "react-router-dom"
import { destroyLocalSessionDetails } from "../Global/SessionManager";
import { Title } from "./Title";

export const NavigationBar = () => {

    const navigate = useNavigate();

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
					onClick={() => window.open(
						"https://github.com/Tom3s/pipe-racer/releases/download/v0.24/PipeRacer-v0.24.exe"
					)}><i className="fa fa-download" /></Button>
					<Button variant="dark"
					style={{
						marginRight: "10px",
						fontSize: "22px",
						padding: "0px",
						width: "40px",
						height: "40px",
					}}
					onClick={() => window.open(
						"https://github.com/Tom3s/pipe-racer/releases"
					)}><i className="fa fa-github" /></Button>
					</div>
                    <Navbar.Toggle />

					<Nav.Link onClick={() => navigate("/tracks")}>Tracks</Nav.Link>

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