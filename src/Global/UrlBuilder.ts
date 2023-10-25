const baseUrl = window.location.protocol + '//pipe-racer.pro/api'
// const baseUrl = 'https://localhost:443/api';

export const LOGIN_URL = baseUrl + '/auth/login';
export const REGISTER_URL = baseUrl + '/auth/register';
export const USER_URL = (id: string = "") => baseUrl + '/users/' + id;
export const PROFILE_PICTURE_URL = (id: string = "") => baseUrl + '/users/picture/' + id;
export const UPLOAD_PROFILE_PICTURE_URL = baseUrl + '/users/uploadPicture';
export const TRACKS_URL = (id: string = "") => baseUrl + '/tracks/' + id;
export const SORTED_TRACKS_URL = (sortByField: string, sortDirection: string) => baseUrl + '/tracks?sortByField=' + sortByField + (sortDirection == "1" ? '&ascending=true' : '&descending=true');
export const RANKS_URL = baseUrl + '/ranks';
export const LEADERBOARD_URL = (id: string = "") => baseUrl + '/leaderboard/' + id;
export const LEADERBOARD_LAPS_URL = (id: string = "") => baseUrl + '/leaderboard/' + id + '?sortByLap=true';
export const CONFIRM_EMAIL_URL = (token: string) => baseUrl + '/auth/confirm?token=' + token;
export const RATE_URL = (id: string) => baseUrl + '/ratings/' + id;
export const USER_STATS_URL = (id: string) => baseUrl + '/stats/user/' + id;