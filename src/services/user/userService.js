/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

export const register = async (
  name,
  email,
  token,
  password,
  gender,
  date,
  avatar,
  coverImage,
) => {
  try {
    const response = await AxiosInstance().post(
      '/users/post-register',
      name,
      email,
      token,
      password,
      gender,
      date,
      avatar,
      coverImage,
    );

    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await AxiosInstance().post(
      '/users/post-login',
      email,
      password,
    );
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};
