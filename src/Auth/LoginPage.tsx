import { Fragment, useEffect, useRef, useState } from "react";
import { Form, Col, Row, InputGroup, Button, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../Global/UrlBuilder";
import { setLocalSessionDetails } from "../Global/SessionManager";
import { Title } from "../Elements/Title";
import "./FormStyle.css";



export const LoginPage = () => {

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [sessionDetails, setSessionDetails] = useState({} as any);
	const [successfulLogin, setSuccessfulLogin] = useState(false);
	const [responseError, setResponseError] = useState("");
	const [userDetails, setUserDetails] = useState({} as any);
	const [redirect, setRedirect] = useState(<Fragment />);
	const [rememberMe, setRememberMe] = useState(false);

	const onChangeUsername = (event: any) => { setUsername(event.target.value); };
	const onChangePassword = (event: any) => { setPassword(event.target.value); };
	const onChangeRememberMe = (event: any) => { setRememberMe(event.target.checked); };

	function handleSubmit(event: any) {
		event.preventDefault();

		const data = {
			"username": username,
			"password": password
		}

		fetch(LOGIN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(async (res) => {
				if (res.status === 200) {
					setSuccessfulLogin(true);
					setSessionDetails({ ...(await res.json()), "password": password, "rememberMe": String(rememberMe) });
					return;
				}
				setResponseError(await res.text());
			});
		setPassword("");
	}

	useEffect(() => {
		if (sessionDetails.sessionToken) {
			setLocalSessionDetails(sessionDetails);
		}
	}, [sessionDetails]);

	useEffect(() => {
		if (successfulLogin) {
			setTimeout(() => {
				setRedirect(<Navigate to="/home" />);
			}, 1000);
		}
	}, [successfulLogin]);

	const getForm = () => {
		return (
			<Fragment>
				<h1>Login</h1>
				<Form onSubmit={handleSubmit}>
					<Col >
						<Form.Group as={Row} controlId="formUsername">
							<Form.Label column sm={2}>Username</Form.Label>
							<InputGroup>
								<Form.Control type="text" placeholder="Enter username" required onChange={onChangeUsername} value={username} />
							</InputGroup>
						</Form.Group>

						<Form.Group as={Row} controlId="formPassword">
							<Form.Label column sm={2}>Password</Form.Label>
							<InputGroup hasValidation>
								<Form.Control type="password" placeholder="Enter password" required onChange={onChangePassword} value={password} />
								<Form.Control.Feedback type="invalid">
									Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one special character.
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group as={Row} controlId="formCheckbox">
							<InputGroup>
								<Form.Check type="checkbox" onChange={onChangeRememberMe} />
								<Form.Label style={{ marginLeft: "5px" }}>Remember Me</Form.Label>
							</InputGroup>
						</Form.Group>
						<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
							<div>
								<a style={{marginRight: "10px"}} onClick={() => navigate("/register")}>Don't have an account?</a>
								<a onClick={() => navigate("/resetPassword")}>Forgot your password?</a>
							</div>
							<Button variant="dark" type="submit">
								Login
							</Button>
						</div>
					</Col>
				</Form>
				{
					successfulLogin ?
						(<div>
							<p>Successful login!</p>
							<p>Redirecting...</p>
							{redirect}
						</div>) :
						(responseError !== "" &&
							<div>
								<p>Failed login!</p>
								<p>Error: {responseError}</p>
							</div>)
				}
			</Fragment>
		)
	}

	return (
		<Fragment>
			<div className="form_div">
				<Title />
				{getForm()}
			</div>
		</Fragment>
	);
}

// export default LoginPage;
