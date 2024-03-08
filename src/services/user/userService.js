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
    const body = {
      email: email,
      password: password,
    };
    const response = await AxiosInstance().post('/users/post-login', body);
    // console.log('register r ', response);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const updateProfile = async (_id, name, gender, date) => {
  try {
    const response = await AxiosInstance().post('/users/update-thongtin', {
      _id: _id,
      name: name,
      gender: gender,
      date: date,
    });
    return response;
  } catch (error) {
    console.log('updateProfile err: ', error);
    return error;
  }
};

export const updateAvatar = async (avatar, coverImage) => {
  try {
    const response = await AxiosInstance().post('/users/update-profile', {
      coverImage: coverImage,
      avatar: avatar,
    });
    return response;
  } catch (error) {
    console.log('updateAvatar error: ', error);
    return error;
  }
};

export const updateCoverImage = async (coverImage) => {
  try {
    const response = await AxiosInstance().post('/users/update-profile', {
      coverImage: v,
    });
    return response;
  } catch (error) {
    console.log('updateCoverImage err: ', error);
    return error;
  }
};
