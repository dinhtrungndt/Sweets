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

// upload bài viết
export const uploadPost = async (userId, postDetails) => {
  try {
    const response = await AxiosInstance().post(
      `/post/${userId}/create-post`,
      postDetails,
    );
    console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Error fetching posts: 11 s', error);
    throw error;
  }
};
