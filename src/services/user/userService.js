/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';
import HomeTest from '../../components/call/HomeTest';
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
   
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const GetListUser = async (_id) => {
  try {
    const res = await AxiosInstance().get(`/message/listchat/${_id}`);

    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};
export const updateStatus = async (_id, status) => {
  try {
    const body = {
      status: 'Đã xem',
      _id: _id,
    };
    const res = await AxiosInstance().post('/message/update-status', body);
    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};

export const getUser = async (_id) => {
  try {
    const res = await AxiosInstance().get(`/users/get-user/${_id}`);
    return res;
  } catch (error) {
    console.log('getUser error', error);
    return error;
  }
};