/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

export const register = async (name, email, password, gioitinh, ngaysinh, token, avatar, anhbia) => {
  try {
    const response = await AxiosInstance().post('/users/post-register', name,
      email,
      password,
      gioitinh,
      ngaysinh,
      token,
      avatar,
      anhbia,);
  
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await AxiosInstance().post('/users/post-login', email, password);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};


