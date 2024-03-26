import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import AxiosInstance from '../../../../helper/Axiosinstance'; // Thay đường dẫn tới file AxiosInstance.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/AllFriendStyles'; // Đảm bảo import styles từ file của bạn

const AllFriend = () => {
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]); 

  useEffect(() => {
    const fetchFriendsDetails = async () => {
      try {
        const axiosInstance = AxiosInstance(); // Tạo một instance của Axios

        // Lấy userId từ AsyncStorage
        const userId = await AsyncStorage.getItem('userId');

        // Kiểm tra xem userId có tồn tại không
        if (userId) {
          const response = await axiosInstance.get(`/friend/friends/${userId}`);
          const { friendsList } = response;

          // Tạo một mảng chứa thông tin chi tiết của các bạn bè
          const friendsDetailsPromises = friendsList.map(async (friendId) => {
            try {
              const friendDetailsResponse = await axiosInstance.get(`/users/get-user/${friendId}`);
              return friendDetailsResponse.user; // Lấy thông tin user từ response
            } catch (error) {
              console.error(`Lỗi khi lấy thông tin của bạn bè có id: ${friendId}`, error);
              return null; // Trả về null nếu có lỗi để xử lý sau
            }
          });

          // Lấy thông tin chi tiết của tất cả bạn bè
          const friendsDetails = await Promise.all(friendsDetailsPromises);

          // Lọc bỏ các giá trị null (nếu có) và lưu thông tin chi tiết vào state
        await  setFriendsDetails(friendsDetails.filter(friend => friend !== null));

          // Lọc ra ngày sinh của bạn bè hiện tại và lưu vào AsyncStorage
          const currentFriendsBirthdays = friendsDetails
            .filter(friend => friend !== null) // Lọc bỏ các giá trị null
            .map(friend => ({ name: friend.name, birthday: friend.ngaysinh,avatar:friend.avatar })); // Lấy ngày sinh của mỗi bạn bè
          await AsyncStorage.setItem('currentFriendsBirthdays', JSON.stringify(currentFriendsBirthdays));
          console.log('nsbb',currentFriendsBirthdays.birthday)
        } else {
          console.log('Không tìm thấy userId trong AsyncStorage');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error);
      }
    };

    fetchFriendsDetails();
  }, []); // Chỉ chạy một lần khi component được render

  useEffect(() => {
    // Lọc danh sách bạn bè dựa trên giá trị tìm kiếm và cập nhật state mới
   
    const filtered = friendsDetails.filter(friend => friend.name.toLowerCase().includes(searchValue.toLowerCase()));
     setFilteredFriends(filtered);
  }, [searchValue, friendsDetails]); // Chạy lại mỗi khi giá trị tìm kiếm hoặc danh sách bạn bè thay đổi

  const handleSearch = (text) => {
    setSearchValue(text); // Cập nhật giá trị tìm kiếm
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          position: 'relative',
        }}>
        <Image
          source={require('../../../../assets/searchh.png')}
          style={styles.imgSearch}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bạn bè"
          placeholderTextColor="#22b6c0"
          onChangeText={handleSearch} 
          value={searchValue}>

          </TextInput>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}> Có {friendsDetails.length} người bạn</Text>
        <Text style={styles.title}>Sắp xếp</Text>
      </View>
      <View style={{ height: 400,paddingBottom:70 }}> 
        <FlatList
          data={filteredFriends}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10,justifyContent:'space-between' }}>
             <View style={{ flexDirection: 'row',alignItems:'center'}}>

             <Image source={{ uri: item.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
              <Text style={styles.txtName}>{item.name}</Text>
             </View>
              <TouchableOpacity style={styles.imgOption}>
                  <Image style={styles.imgOption} source={require('../../../../assets/option.png')} />
                </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id} // Không cần chuyển đổi thành chuỗi
        />
       
      </View>
    </View>
  );
};

export default AllFriend;
