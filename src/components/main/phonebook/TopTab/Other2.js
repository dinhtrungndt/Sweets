import AxiosInstance from "../../../../helper/Axiosinstance"
const filteredUsers = async(userId)=>{
    const friendsFromStorage = await AxiosInstance().get(`/friend/friends/${userId}`);
    const friendSent = await AxiosInstance().get(`/friend/friend-requests-sent/${userId}`)
    const friendReci = await AxiosInstance().get(`/friend/friend-requests/${userId}`)
    const allFriend = await AxiosInstance().get('/user/get-user')
    const OtherFriend = allFriend.filter(item => item._id != userId)
}