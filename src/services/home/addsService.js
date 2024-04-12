import AxiosInstance from '../../helper/Axiosinstance';

export const getListFriend = async idUser => {
  try {
    const res = await AxiosInstance().get(`/friend/friends/${idUser}`);
    // console.log('getListUser res', res.friendsList);
    return res.friendsList;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};
