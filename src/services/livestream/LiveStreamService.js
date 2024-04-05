import AxiosInstance from '../../helper/Axiosinstance';
export const getAllLiveStream = async () => {
  try {
    const response = await AxiosInstance().get('livestream/getAllLivestreams');
    return response;
  } catch (error) {
    console.log('getAllLiveStream: ', error);
    return error;
  }
};
export const addLiveStream = async (liveid, username, avatar) => {
  try {
    body = {
      liveid,
      username,
      avatar,
    };
    const response = await AxiosInstance().post(
      'livestream/addLivestream',
      body,
    );
    return response;
  } catch (error) {
    console.log('addLiveStream: ', error);
    return error;
  }
};
export const deleteLiveStream = async liveid => {
  try {
    const response = await AxiosInstance().delete(
      `livestream/deleteLivestream/${liveid}`,
    );
    return response;
  } catch (error) {
    console.log('deleteLiveStream: ', error);
    return error;
  }
};
