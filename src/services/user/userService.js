/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import AxiosInstance from '../../helper/Axiosinstance';
import {UserContext} from '../../contexts/user/userContext';

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

export const updateAvatar = async (id, data) => {
  const response = await AxiosInstance().put(
    `/users/update-avatar/${id}`,
    data,
  );
  console.log('response:', response);
  return response.data;
};

export const updateCover = async (id, data) => {
  const response = await AxiosInstance().put(
    `/users/update-avatar/${id}`,
    data,
  );
  console.log('response:', response);
  return response.data;
};

export const GetListUser = async () => {
  try {
    const res = await AxiosInstance().get('/users/get-users');
    return res.users;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};

export const GetListUserById = async (_id) => {
  try {
    const res = await AxiosInstance().get(`/users/get-users/${_id}`);
    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};
