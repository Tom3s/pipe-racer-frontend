import { LOGIN_URL } from "./UrlBuilder";

export interface SessionDetails {
	username: string;
	userId: string;
	sessionToken: string;
	loginDate: string;
	profilePictureUrl: string;
	rememberMe: boolean;
	// username: string;
	password: string;
}


export const setLocalSessionDetails = (sessionDetails: SessionDetails) => {
	localStorage.setItem('username', sessionDetails.username);
	localStorage.setItem('userId', sessionDetails.userId);
	localStorage.setItem('sessionToken', sessionDetails.sessionToken);
	localStorage.setItem('loginDate', sessionDetails.loginDate);
	localStorage.setItem('profilePictureUrl', sessionDetails.profilePictureUrl);
	localStorage.setItem('rememberMe', sessionDetails?.rememberMe.toString());
	if (localStorage.getItem('rememberMe') == 'true') {
		localStorage.setItem('password', sessionDetails.password);
	}
}

export const destroyLocalSessionDetails = () => {
	localStorage.removeItem('username');
	localStorage.removeItem('userId');
	localStorage.removeItem('sessionToken');
	localStorage.removeItem('loginDate');
	localStorage.removeItem('profilePictureUrl');
	localStorage.removeItem('password');
	localStorage.removeItem('rememberMe');
}

export const refreshSessionDetails = () => {
	const currentDate = new Date();
	const loginDate = new Date(localStorage.getItem('loginDate') || "");
	const timeDifference = currentDate.getTime() - loginDate.getTime();
	if (localStorage.getItem('rememberMe') == 'true' && timeDifference > 600000) {
		console.log("refreshing session details");
		const data = {
			"username": localStorage.getItem('username') || "",
			"password": localStorage.getItem('password') || ""
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
					setLocalSessionDetails({...(await res.json()), 
						"password": localStorage.getItem('password') || "", 
						"rememberMe": localStorage.getItem('rememberMe') || ""});
					return;
				}
			});
	} else if (timeDifference > 3600000 * 12) {
		 {
			destroyLocalSessionDetails();
		}
	}
}