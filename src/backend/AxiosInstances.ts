import axios, { AxiosInstance, AxiosResponse } from 'axios';

const MyServer: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
});

MyServer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
MyServer.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // You can handle errors here
    return Promise.reject(error);
  }
);

export default MyServer;
