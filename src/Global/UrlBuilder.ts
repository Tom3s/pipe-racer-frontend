const baseUrl = 'https://34.159.46.241:443/api'

export const LOGIN_URL = baseUrl + '/auth/login';
export const REGISTER_URL = baseUrl + '/auth/register';
export const USER_URL = (id: string = "") => baseUrl + '/users/' + id;
export const PROFILE_PICTURE_URL = (id: string = "") => baseUrl + '/users/picture/' + id;
export const UPLOAD_PROFILE_PICTURE_URL = baseUrl + '/users/uploadPicture';
export const TRACKS_URL = (id: string = "") => baseUrl + '/tracks/' + id;
export const LEADERBOARD_URL = (id: string = "") => baseUrl + '/leaderboard/' + id;
export const LEADERBOARD_LAPS_URL = (id: string = "") => baseUrl + '/leaderboard/' + id + '?sortByLap=true';
