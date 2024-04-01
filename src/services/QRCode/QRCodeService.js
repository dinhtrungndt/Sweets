import AxiosInstance from "../../helper/Axiosinstance";
export const CreateDevice = async (device) => {
  const body = {
    deviceid: device
  }
  try {
    const response = await AxiosInstance().post('loginQRCode/add-loginQRCode', body);
    return response;
  } catch (error) {
    console.log('CreateDevice: ', error);
    return error;
  }
}
export const getDevice = async () => {
  try {
    const response = await AxiosInstance().get('loginQRCode/get-loginQRCode');
    return response;
  } catch (error) {
    console.log('getDevice: ', error);
    return error;
  }
}