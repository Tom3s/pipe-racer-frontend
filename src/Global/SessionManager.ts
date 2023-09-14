export interface SessionDetails {
	username: string;
	userId: string;
	sessionToken: string;
	loginDate: string;
	profilePictureUrl: string;
}


export const setLocalSessionDetails = (sessionDetails: SessionDetails) => {
	localStorage.setItem('username', sessionDetails.username);
	localStorage.setItem('userId', sessionDetails.userId);
	localStorage.setItem('sessionToken', sessionDetails.sessionToken);
	localStorage.setItem('loginDate', sessionDetails.loginDate);
	localStorage.setItem('profilePictureUrl', sessionDetails.profilePictureUrl);
}