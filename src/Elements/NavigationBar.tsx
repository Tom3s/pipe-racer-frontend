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
                    <Navbar.Brand href="/home">PIPE RACER</Navbar.Brand>
                    <Navbar.Toggle />

					<Nav.Link href="/tracks">Tracks</Nav.Link>

                    {
                        localStorage.getItem('sessionToken') !== null &&
                        <Navbar.Text>
                            Signed in as: <a href={"/profile?id=" + localStorage.getItem('userId')}>{localStorage.getItem('username')}</a>
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