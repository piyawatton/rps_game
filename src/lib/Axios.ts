import axios from 'axios';
import Cookies from 'js-cookie';

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

AxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('auth');
    if (authToken) {
      config.headers['authorization'] = `${authToken}`.replace(/"/g, '').trim();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)
