import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

httpClient.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

httpClient.interceptors.response.use(
  response => {
    if (response.data.tokenPair) {
      const { accessToken, refreshToken } = response.data.tokenPair;

      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refreshToken);
    }
    return response;
  },
  async err => {
    const refresh = localStorage.getItem(CONTANTS.REFRESH_TOKEN);
    if (err.response.status === 419 && refresh) {
      const res = await httpClient.post('/auth/refresh', {
        refreshToken: refresh,
      });

      const {
        data: {
          tokenPair: { accessToken, refreshToken },
        },
      } = res;

      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refreshToken);

      err.config.headers['Authorization'] = `Bearer ${accessToken}`;

      return axios.request(err.config);
    }
    return Promise.reject(err);
  }
);

export default httpClient;
