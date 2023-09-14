const baseUrl = 'http://localhost:80/api'

export const LOGIN_URL = baseUrl + '/auth/login';
export const REGISTER_URL = baseUrl + '/auth/register';
export const USER_URL = (id: string) => baseUrl + '/users/' + id;
export const PROFILE_PICTURE_URL = (id: string) => baseUrl + '/users/picture/' + id;
export const UPLOAD_PROFILE_PICTURE_URL = baseUrl + '/users/uploadPicture';