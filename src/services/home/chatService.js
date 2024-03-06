/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';

export const GetMessageSR = async (idSender, idReceiver) => {
  try {
    const res = await AxiosInstance().get(
      `/message/get-message/${idSender}/${idReceiver}`,
    );
    return res;
  } catch (error) {
    console.log('getMessage error', error);
    return error;
  }
};
