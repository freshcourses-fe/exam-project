import http from '../interceptor';

export const registerRequest = (data) => http.post('auth/registration', data);
export const loginRequest = (data) => http.post('auth/login', data);
export const refresh = (data) => http.post('auth/refresh', {refreshToken: data});