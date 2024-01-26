/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

// lấy danh sách bài viết
export const getPosts = async () => {
  try {
    const response = await AxiosInstance().get('/posts/get-all-posts');
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Error fetching posts: 11 s', error);
    throw error;
  }
};

// Lấy danh sách media theo idPosts
export const getMedia = async idPosts => {
  try {
    const response = await AxiosInstance().get(`/media/get-media/${idPosts}`);
    // console.log('get post >>>>>>>>>>>>>>> Service getMedia 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi get: 2333333 getMedia', error);
    throw error;
  }
};

// Lấy số lượng share
export const getShare = async idPosts => {
  try {
    const response = await AxiosInstance().get(`/posts/get-share/${idPosts}`);
    console.log('get post >>>>>>>>>>>>>>> Service getShare 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi get: 35555555 getShares', error);
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

// Like bài viết theo id
export const likePost = async (userId, postId) => {
  try {
    const response = await AxiosInstance().post(
      `/post/like/${postId}/${userId}`,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi like bài viết: 11 s', error.response);
    throw error;
  }
};
