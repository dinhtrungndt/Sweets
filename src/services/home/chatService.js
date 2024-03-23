import AxiosInstance from '../../helper/Axiosinstance';

export const GetMessageSR = async (idSender, idReceiver) => {
  try {
   console.log('idSender', idSender);
    console.log('idReceiver', idReceiver);
    const res = await AxiosInstance().get(`message/get-message/list/${idSender}/${idReceiver}`);
    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};
