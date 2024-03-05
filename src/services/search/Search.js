/* eslint-disable prettier/prettier */
import AxiosInstance from '../../helper/Axiosinstance';


// tìm người dùng
export const searchuser = async (name) => {

    try {
        if (name === '') {
            return
        }
        const response = await AxiosInstance().post(
            `users/search-user`,
            { name: name }
        );

        return response;
    } catch (error) {
        console.error(' >>>>>>>>> Lỗi không tìm được người dùng', error.name);
        throw error;
    }
};
// tìm bài viết
export const searchpost = async (name) => {
    try {
        if (name === '') {
            return;
        }
        const response = await AxiosInstance().post(
            `posts/search-all-post`,
            { name: name }
        );
        return response;
    } catch (error) {
        console.error(' >>>>>>>>> lỗi không tìm được bài viết', error.name);
        throw error;
    }
};




