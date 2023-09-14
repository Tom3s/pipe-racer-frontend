import { Fragment, useEffect, useRef, useState } from "react";
import { Form, Col, Row, InputGroup, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../Global/UrlBuilder";
import { Title } from "../Elements/Title";
import "./FormStyle.css";


export const RegisterPage = () => {

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [token, setToken] = useState("");

	const onChangeUsername = (event: any) => { setUsername(event.target.value); };
	const onChangeEmail = (event: any) => { setEmail(event.target.value); };
	const onChangePassword = (event: any) => { setPassword(event.target.value); };

	const validatePassword = (): boolean => {
		// one uppercase, one lowercase, and one special character
		const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		return regex.test(password);
	}

	const validateUsername = (): boolean => {
		const regex = /^[a-zA-Z0-9-_.]+$/;
		return regex.test(username);
	}

	const verifyEmailValidity = (email: string): boolean => {
		const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		return regex.test(email);
	};

	useEffect(() => {
		setValidPassword(password == "" || validatePassword());
	}, [password]);

	useEffect(() => {
		setValidEmail(email == "" || verifyEmailValidity(email));
	}, [email]);

	useEffect(() => {
		setValidUsername(username == "" || validateUsername());
	}, [username]);

	function handleSubmit(event: any) {
		event.preventDefault();

		const data = {
			"username": username,
			"email": email,
			"password": password
		}

		fetch(REGISTER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.text())
			.then(data => {
				setToken(data);
			});

		setUsername("");
		setEmail("");
		setPassword("");
	}

	const getField = (label: string, placeholder: string, onChange: any, value: any, isInvalid: boolean, isValid: boolean, invalidMessage: string, type: string) => {
		return (
			<Form.Group as={Row} controlId={label}>
				<Form.Label column sm={2}>{label}</Form.Label>
				<InputGroup hasValidation>
					<Form.Control type={type} placeholder={placeholder} required onChange={onChange} value={value} isInvalid={isInvalid} isValid={isValid} />
					<Form.Control.Feedback type="invalid">
						{invalidMessage}
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
		)
	}

	const getUsernameField = () => {
		return getField(
			"Username",
			"Enter username",
			onChangeUsername,
			username,
			!validUsername,
			username != "" && validUsername,
			"Username must be at least 1 character long and contain only letters, numbers, and the following characters: -_.",
			"text"
		)
	}

	const getEmailField = () => {
		return getField(
			"Email",
			"Enter email",
			onChangeEmail,
			email,
			!validEmail,
			email != "" && validEmail,
			"Email must be valid",
			"email"
		)
	}

	const getPasswordField = () => {
		return getField(
			"Password",
			"Enter password",
			onChangePassword,
			password,
			!validPassword,
			password != "" && validPassword,
			"Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one special character.",
			"password"
		)
	}

	const getForm = () => {
		return (
			<Fragment>
				<h1>Register</h1>
				<Form onSubmit={handleSubmit}>
					<Col>
						{getUsernameField()}
						{getEmailField()}
						{getPasswordField()}
						<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
							<a href="/login">Already have an account?</a>
							<Button variant="dark" type="submit" disabled={(password == "" || !validPassword) || (username == "" || !validUsername) || (email == "" || !validEmail)}>
								Register
							</Button>
						</div>
					</Col>
				</Form>

				{
					token != "" &&
					(<div>
						<h2>Registration initiated</h2>
						<p>
							{token}
						</p>
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
		</Fragment >
	);
}

