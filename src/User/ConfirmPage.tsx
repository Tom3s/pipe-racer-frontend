import { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { CONFIRM_EMAIL_URL } from "../Global/UrlBuilder";

export const ConfirmPage = () => {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const [registrationToken, setRegistrationToken] = useState(searchParams.get("token") || "");

	const [responseText, setResponseText] = useState("Loading...");
	const [showLogin, setShowLogin] = useState(false);

	useEffect(() => {
		if (!registrationToken) {
			setResponseText("Invalid token");
			return;
		}


		fetch(CONFIRM_EMAIL_URL(registrationToken))
			.then(async response => {
				setShowLogin(response.status === 200);
				const text = await response.text();
				setResponseText(text);
			})
	}, [registrationToken]);

	return (
		<div className="form_div"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<p>{responseText}</p>
			{
				showLogin ?
					<a onClick={() => navigate("/login")}>Login</a>
					:
					responseText !== "Loading..." ?
						<a onClick={() => navigate("/register")}>Register</a>
						:
						<Fragment />
			}
			
		</div>
	);
}

