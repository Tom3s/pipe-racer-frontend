import { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { REGISTER_URL, RESET_PASSWORD_CONFIRM_URL, RESET_PASSWORD_URL } from "../Global/UrlBuilder";
import { Row, InputGroup, Col, Button, Form } from "react-bootstrap";
import { Title } from "../Elements/Title";
import { verifyEmailFormat, verifyPasswordStrength, verifyUsername } from "../User/CredentialValidation";

export const ResetPasswordPage = () => {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [token, setToken] = useState(searchParams.get("token") || "");

	const onChangeUsername = (event: any) => { setUsername(event.target.value); };
	const onChangeEmail = (event: any) => { setEmail(event.target.value); };
	const onChangePassword = (event: any) => { setPassword(event.target.value); };
	const onChangeConfirmPassword = (event: any) => { setConfirmPassword(event.target.value); };

	const validatePassword = (): boolean => {
		return verifyPasswordStrength(password);
	}

	const validateUsername = (): boolean => {
		return verifyUsername(username);
	}

	const verifyEmailValidity = (email: string): boolean => {
		return verifyEmailFormat(email);
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

	function handleRequestReset(event: any) {
		event.preventDefault();

		const data = {
			"username": username,
			"email": email,
		}

		fetch(RESET_PASSWORD_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.text())
			.then(data => {
				alert(data);
			});

		setUsername("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
	}

	function handleConfirmReset(event: any) {
		event.preventDefault();

		const data = {
			"password": password,
		}

		fetch(RESET_PASSWORD_CONFIRM_URL(token), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.text())
			.then(data => {
				alert(data);
				navigate("/login");
			});

		setUsername("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
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
		return (
			<Fragment>
				{
					getField(
						"Password",
						"Enter password",
						onChangePassword,
						password,
						!validPassword,
						password != "" && validPassword,
						"Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one special character/number.",
						"password"
					)
				}
				{
					getField(
						"Confirm Password",
						"Confirm password",
						onChangeConfirmPassword,
						confirmPassword,
						confirmPassword != password,
						confirmPassword == password && password != "",
						"Passwords must match",
						"password"
					)
				}
			</Fragment>
		)
	}

	const getRequestForm = () => {
		return (
			<Fragment>
				<h1>Request Reset Password</h1>
				<hr />
				Enter the username and email you registered with, and we will send and email with a reset link
				<hr />
				<Form onSubmit={handleRequestReset}>
					<Col>
						{getUsernameField()}
						{getEmailField()}
						<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
							<a onClick={() => navigate("/login")}>Already have an account?</a>
							<Button variant="dark" type="submit" disabled={(username == "" || !validUsername) || (email == "" || !validEmail)}>
								Send Reset Email
							</Button>
						</div>
					</Col>
				</Form>
			</Fragment>
		)
	}

	const getConfirmForm = () => {
		return (
			<Fragment>
				<h1>Confirm Reset Password</h1>
				<Form onSubmit={handleConfirmReset}>
					<Col>
						{getPasswordField()}
						<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
							<a onClick={() => navigate("/register")}>Already have an account?</a>
							<Button variant="dark" type="submit" disabled={(password == "" || !validPassword || password != confirmPassword)}>
								Update Password
							</Button>
						</div>
					</Col>
				</Form>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<div className="form_div">
				<Title />
				{token == "" ? getRequestForm() : getConfirmForm()}
			</div>
		</Fragment >
	);
}