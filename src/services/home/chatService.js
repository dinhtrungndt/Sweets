import AxiosInstance from '../../helper/Axiosinstance';

export const GetMessageSR = async (idSender, idReceiver) => {
  try {

    const res = await AxiosInstance().get(`message/get-message/list/${idSender}/${idReceiver}`);
    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};
