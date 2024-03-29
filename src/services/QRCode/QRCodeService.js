import AxiosInstance from '../../helper/Axiosinstance'; 
export const CreateDevice = async (device) => {
  try {
    const response = await AxiosInstance().post('loginQRCode/add-loginQRCode', device);
    return response;
  } catch (error) {
    console.log('CreateDevice: ', error);
    return error;
  }
}