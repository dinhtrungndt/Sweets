/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

export const register = async (name, ngaysinh, gioitinh, email, password) => {
  try {
    const body = {
      name,
      ngaysinh,
      gioitinh,
      email,
      password,
    };
    const response = await AxiosInstance().post('/user/post-register', body);
    console.log('register r ', response);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await AxiosInstance().post('/user/post-login', email, password);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const update = async (data) => {
  try {
    const response = await AxiosInstance().post('/user/post-update', data);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};
