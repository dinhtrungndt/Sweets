/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

// lấy danh sách bài viết theo typePosts
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
    // console.log('get post >>>>>>>>>>>>>>> Service getShare 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi get: 35555555 getShares', error);
    throw error;
  }
};

// Lấy cảm xúc theo idPosts
export const getReaction = async idPosts => {
  try {
    const response = await AxiosInstance().get(
      `/reaction/getPostsId/${idPosts}`,
    );
    // console.log('get post >>>>>>>>>>>>>>> Service getReaction 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi get: 4777777 getReaction', error);
    throw error;
  }
};

// Lấy danh sách comments theo idPosts
export const getComments = async idPosts => {
  try {
    const response = await AxiosInstance().get(
      `/comments/get-comment/${idPosts}`,
    );
    // console.log('get post >>>>>>>>>>>>>>> Service getComments 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi get: 5999999 getComments', error);
    throw error;
  }
};

// Like bài viết theo idUsers và idPosts và type
export const likeByPost = async (idUsers, idPosts, type) => {
  try {
    const response = await AxiosInstance().post(
      `/reaction/add/${idUsers}/${idPosts}`,
      {type},
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu API:', error);
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
    'media/upload-imageStatus',
    form,
  );
  // console.log('>>>>>>>>>>>>>>>>>> 49 MEdiA imageStatus', response);
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

// Comment theo idUsers và idPosts
export const submitComments = async (userId, postId, content) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/add/${userId}/${postId}`,
      {content},
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response.data;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi comments bài viết: 11 s', error);
    throw error;
  }
};

// Comment theo idUsers, idPosts và idParent
export const submitCommentsC = async (userId, postId, parentId, content) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/add/${userId}/${postId}/${parentId}`,
      {content},
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response.data;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi commentsC bài viết: 11 s', error.response);
    throw error;
  }
};
