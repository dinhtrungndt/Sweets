import AxiosInstance from "../../helper/Axiosinstance";

export const GetFriendSR = async (id) => {
    try {
        const res = await AxiosInstance().get(`/friend/friends/${id}`);
        return res;
    } catch (error) {
        console.log("getFriend error", error);
        return error;
    }
};