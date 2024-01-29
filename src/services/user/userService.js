/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

export const register = async (name, gioitinh, ngaysinh, email, password) => {
  try {
    const body = {
      name: name,
      gioitinh: gioitinh,
      ngaysinh: ngaysinh,
      email: email,
      password: password,
    };
    const response = await AxiosInstance().post('/user/post-register', body);
    console.log('register result: ', response);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
    };
    const response = await AxiosInstance().post('/user/post-login', body);
    // console.log('register r ', response);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};
