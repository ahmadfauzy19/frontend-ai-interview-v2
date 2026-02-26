import axios from 'axios';
import { storageService } from './storageUtils';

const axiosUtils = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let logoutHandler: () => void;

export const injectLogout = (handler: () => void) => {
  logoutHandler = handler;
};

axiosUtils.interceptors.request.use(
  config => {
    const userData = storageService.get('uid');
    const token = userData?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosUtils.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      if (logoutHandler) {
        logoutHandler();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosUtils;
