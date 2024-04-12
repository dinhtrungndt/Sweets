/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

export const getPostsAll = async () => {
  try {
    const response = await AxiosInstance().get(`/posts/get-all-posts`);
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Error fetching posts: 11 s', error);
    throw error;
  }
};

// lấy danh sách bài viết theo typePosts
export const getPosts = async idUsers => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-posts-idObject/${idUsers}`,
    );
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Error fetching posts: 11 s', error);
    throw error;
  }
};

// Lấy chi tiết bài viết theo idPosts
export const getPostsDetail = async idPosts => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-detail-post/${idPosts}`,
    );
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Error fetching posts: 11 s', error);
    throw error;
  }
};

export const getPostsByUser = async idUsers => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-posts-by-user/${idUsers}`,
    );
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

// Lấy cảm xúc theo idPosts và idComments
export const getReactionComments = async idComments => {
  try {
    const response = await AxiosInstance().get(
      `/reaction/get-idComments/${idComments}`,
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

// Like comments theo idUsers và idComments và type
export const likeByComments = async (idUsers, idComments, type) => {
  try {
    const response = await AxiosInstance().post(
      `/reaction/add-comments/${idUsers}/${idComments}`,
      {type},
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu API:', error);
    throw error;
  }
};

// Xóa comments theo idUsers và idComments
export const deleteCommentsC = async (idUsers, idComments) => {
  try {
    const response = await AxiosInstance().delete(
      `/comments/delete/${idUsers}/${idComments}`,
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu API:', error);
    throw error;
  }
};

// Xóa nguyên comments
export const deleteComments = async idComments => {
  try {
    const response = await AxiosInstance().delete(
      `/comments/delete/${idComments}`,
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu API:', error);
    throw error;
  }
};

// upload bài viết
export const uploadPost = async (idUsers, postDetails) => {
  try {
    const response = await AxiosInstance().post(
      `/posts/add-posts/${idUsers}`,
      postDetails,
    );
    // console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi upload bài viết : 11 s', error);
    throw error;
  }
};

// upload media
export const uploadMedia = async (idPosts, cbMediaType) => {
  try {
    const response = await AxiosInstance().post(
      `/media/add-media/${idPosts}`,
      cbMediaType,
    );
    // console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi upload mediaaa : 11 s', error);
    throw error;
  }
};

// Xóa ảnh trên cloudinary
export const deleteMediaCloudinary = async () => {
  try {
    const response = await AxiosInstance().delete(
      `/media/delete-media-cloudinary`,
    );
    console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi upload mediaaa : 11 s', error);
    throw error;
  }
};

// Upload ảnh status
export const uploadImageStatus = async form => {
  const response = await AxiosInstance('multipart/form-data').post(
    'media/upload-media',
    form,
  );
  // console.log('>>>>>>>>>>>>>>>>>> 49 MEdiA media', response);
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
export const submitComments = async (
  userId,
  postId,
  content,
  image,
  parentUserName,
) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/add/${userId}/${postId}`,
      {content, image, parentUserName},
    );
    // console.log('submitComments post >>>>>>>>>>>>>>> 20 ', response.data);
    return response.data;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi comments bài viết: 11 s', error);
    throw error;
  }
};

// Comment theo idUsers, idPosts và idParent
export const submitCommentsC = async (
  userId,
  postId,
  parentId,
  content,
  image,
  parentUserName,
) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/add/${userId}/${postId}/${parentId}`,
      {content, image, parentUserName},
    );
    // console.log('comment post >>>>>>>>>>>>>>> 20 ', response);
    return response.data;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi commentsC bài viết: 11 s', error.response);
    throw error;
  }
};

// Xóa bài viết account
export const deletePostsAccount = async id => {
  try {
    const response = await AxiosInstance().delete(`/posts/delete-posts/${id}`);
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi xóa bài viết: 11 s', error.response);
    throw error;
  }
};

// Cập nhập objects edit posts
export const updateEditPostsObjects = async (idPosts, idObject) => {
  try {
    const response = await AxiosInstance().put(
      `/posts/update-objects-posts/${idPosts}/${idObject}`,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi xóa bài viết: 11 s', error.response);
    throw error;
  }
};

// Cập nhập edit posts
export const updateEditPosts = async (idPosts, idUsers, detailPosts) => {
  try {
    const response = await AxiosInstance().put(
      `/posts/update-posts/${idPosts}/${idUsers}`,
      detailPosts,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// Sắp xếp comments dựa theo bạn bè
export const ArrangeCommentFriend = async (idUsers, idPosts) => {
  try {
    const response = await AxiosInstance().get(
      `/comments/arrange-comment-friend/${idUsers}/${idPosts}`,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// Lấy danh sách user
export const getListUser = async () => {
  try {
    const response = await AxiosInstance().get(`/users/get-users`);
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response.users;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// lấy lịch sử tìm kiếm
export const getHistorySearch = async idUsers => {
  try {
    const response = await AxiosInstance().get(
      `/users/search-history/${idUsers}`,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response.searchHistory);
    return response.searchHistory;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// thêm lịch sử tìm kiếm
export const addHistorySearch = async (id, name) => {
  try {
    const response = await AxiosInstance().post(`/users/search-user/${id}`, {
      name,
    });
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response.users);
    return response.users;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// Lấy bài viết chúc mừng sinh nhật
export const getPostsBirthday = async idUsers => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-birthday-posts/${idUsers}`,
    );
    // console.log('birthdayPosts post >>>>>>>>>>>>>>> 20 ', response.birthdayPosts);
    return response.birthdayPosts;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// Lấy bài viết location
export const getPostsLocation = async idUsers => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-location-posts/${idUsers}`,
    );
    // console.log('locationPosts post >>>>>>>>>>>>>>> 20 ', response.locationPosts);
    return response.locationPosts;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// Lấy danh sách reaction theo idUsers và idPosts
export const getReactionDetail = async (idUsers, idPosts) => {
  try {
    const response = await AxiosInstance().get(
      `/reaction/get-idUsers/${idUsers}/${idPosts}`,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi Cập nhập edit posts : 11 s', error.response);
    throw error;
  }
};

// Lấy backgroundColor theo idUsers và idPosts
export const getBackgroundColor = async (idUsers, idPosts) => {
  try {
    const response = await AxiosInstance().get(
      `/colors/get-detail/${idUsers}/${idPosts}`,
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi getBackgroundColor : 11 s', error.response);
    throw error;
  }
};

// Thêm backgroundColor theo idUsers và idPosts
export const addBackgroundColor = async (idUsers, idPosts, color) => {
  try {
    const response = await AxiosInstance().post(
      `/colors/add/${idUsers}/${idPosts}`,
      {color},
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(' >>>>>>>>> Lỗi addBackgroundColor : 11 s', error.response);
    throw error;
  }
};
