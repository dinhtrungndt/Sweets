/* eslint-disable prettier/prettier */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: 'https://api.dinhtrungndt.id.vn/',
    // baseURL: 'https://sweets-nodejs.onrender.com/',
    // baseURL: 'https://sweets-25ffe0886b03.herokuapp.com',
    // baseURL: 'http://192.168.2.209:3001/', // home (T)
    // baseURL: 'http://192.168.0.102:3001/', // homeĐ (T)
    // baseURL: 'http://172.16.71.76:3001/',
    // baseURL: 'http://192.168.1.240:3001/',
  });

  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
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
