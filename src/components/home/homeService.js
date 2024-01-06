/* eslint-disable prettier/prettier */
import AxiosInstance from '../helper/Axiosinstance';

// lấy danh sách bài viết
export const getPosts = async () => {
  try {
    const response = await AxiosInstance().get('/post/get-all-post');
    // console.log('get post >>>>>>>>>>>>>>> 8 ', response.posts);
    return response.posts;
  } catch (error) {
    console.error(' >>>>>>>>> Error fetching posts: 11 s', error);
    throw error;
  }
};

// Lấy danh sách bài viết bạn bè theo id
export const getPostById = async userId => {
  try {
    const response = await AxiosInstance().get(`/friend/${userId}`);
    // console.log('get post >>>>>>>>>>>>>>> 8 ', response.Data);
    return response.Data;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi get: 11 s', error);
    throw error;
  }
};

// upload bài viết
export const uploadPost = async (userId, postDetails) => {
  try {
    const response = await AxiosInstance().post(
      `/post/${userId}/create-post`,
      postDetails,
    );
    // console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi loading ảnh: 11 s', error.response);
    throw error;
  }
};

// Upload ảnh status
export const uploadImageStatus = async form => {
  const response = await AxiosInstance('multipart/form-data').post(
    'post/upload-imageStatus',
    form,
  );
  // console.log(">>>>>>>>>>>>>>>>>> 49" ,response);
  return response;
};
