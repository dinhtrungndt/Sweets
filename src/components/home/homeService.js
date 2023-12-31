/* eslint-disable prettier/prettier */
import AxiosInstance from '../helper/Axiosinstance';

// lấy danh sách bài viết
export const getPosts = async () => {
  try {
    const response = await AxiosInstance().get('/post/get-all-post');
    // console.log('get post >>>>>>>>>>>>>>> 7 ', response.posts);
    return response.posts;
  } catch (error) {
    console.error('Error fetching posts: 11 s', error);
    throw error; // rethrow the error to be caught by the calling function
  }
};
