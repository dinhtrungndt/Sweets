/* eslint-disable prettier/prettier */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
  });

  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      const apiKey = 'b0e86008293e7c25b2deb2caa5a36b0c';
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      // Add API key to headers
      if (apiKey) {
        config.params = {
          ...config.params,
          appid: apiKey,
        };
      }
      return config;
    },
    err => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err),
  );
  return axiosInstance;
};

export default AxiosInstance;
