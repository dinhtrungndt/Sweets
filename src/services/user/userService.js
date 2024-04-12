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

export const GetListUser = async _id => {
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

export const getUser = async _id => {
  try {
    const res = await AxiosInstance().get(`/users/get-user/${_id}`);
    return res;
  } catch (error) {
    console.log('getUser error', error);
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

export const changePassword = async (_id, password, newPassword) => {
  try {
    const body = {
      _id: _id,
      password: password,
      newPassword: newPassword,
    };
    const res = await AxiosInstance().post('/users/post-update-password', body);
    return res;
  } catch (error) {
    console.log('changePassword error', error);
    return error;
  }
};

// lấy danh sách bài viết theo id người dùng
export const getPostByUserId = async idUsers => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-detail-users/${idUsers}`,
    );
    // console.log('getPostByUserId response:', response.userPosts);
    return response.userPosts;
  } catch (error) {
    console.error('getPostByUserId error:', error);
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const body = {
      email: email,
    };
    const response = await AxiosInstance().post('/users/forgot-password', body);
    return response;
  } catch (error) {
    console.log('forgetPassword error:', error);
    return error;
  }
};

export const checkOTP = async (email, otp) => {
  try {
    const body = {
      email: email,
      otp: otp,
    };
    const response = await AxiosInstance().post('/users/check-otp', body);
    return response;
  } catch (error) {
    console.log('checkOTP error:', error);
    return error;
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const body = {
      email: email,
      otp: otp,
      newPassword: newPassword,
    };
    const response = await AxiosInstance().post('/users/reset-password', body);
    return response;
  } catch (error) {
    console.log('resetPassword error:', error);
    return error;
  }
};
