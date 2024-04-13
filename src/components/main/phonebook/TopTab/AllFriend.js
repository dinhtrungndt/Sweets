import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,RefreshControl
} from 'react-native';
import AxiosInstance from '../../../../helper/Axiosinstance'; // Thay đường dẫn tới file AxiosInstance.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/AllFriendStyles'; // Đảm bảo import styles từ file của bạn

const AllFriend = () => {
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]); 
  const [friendInvitations, setFriendInvitations] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [refresh, setRefresh] = useState(false); // Thêm biến state refresh
  const [sortByName, setSortByName] = useState(false); // Thêm biến state để sắp xếp theo tên
  const [refreshing, setRefreshing] = useState(false);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFriendToDelete, setSelectedFriendToDelete] = useState(null);
  

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

          console.log('responsessss',response)
        
          await AsyncStorage.setItem('friendData', JSON.stringify(response.friendsList));

          // Tạo một mảng chứa thông tin chi tiết của các bạn bè
          const friendsDetailsPromises = friendsList.map(async (friendId) => {
            try {
              console.log('friendId',friendId)
              const friendDetailsResponse = await axiosInstance.get(`/users/get-user/${friendId.id}`);
              console.log('friendDetailsResponse2222',friendDetailsResponse)
              return friendDetailsResponse.user; // Lấy thông tin user từ response
            } catch (error) {
              console.error(`Lỗi khi lấy thông tin của bạn bè có id: ${friendId}`, error);
              return null; // Trả về null nếu có lỗi để xử lý sau
            }
          });

          // Lấy thông tin chi tiết của tất cả bạn bè
          const friendsDetails = await Promise.all(friendsDetailsPromises);
         // console.log('friendsDetails', friendsDetails);
          
          // Tạo một mảng mới chứa thông tin đầy đủ về bạn bè (tên, avatar, ngày sinh nhật)
          const birthdaysWithDetails = friendsDetails.map(friend => ({
            name: friend.name,
            avatar: friend.avatar,
            birthday: friend.date // Giả sử 'date' là ngày sinh nhật của bạn bè
          }));
          console.log('birthdaysWithDetails', birthdaysWithDetails);
          // Lưu mảng birthdaysWithDetails vào AsyncStorage
          await AsyncStorage.setItem('currentFriendsBirthdays', JSON.stringify(birthdaysWithDetails));
          
          // Lọc bỏ các giá trị null (nếu có) và lưu thông tin chi tiết vào state
          await setFriendsDetails(friendsDetails.filter(friend => friend !== null));
        } else {
          console.log('Không tìm thấy userId trong AsyncStorage');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error);
      }
    };

    fetchFriendsDetails();
  }, []); 

  useEffect(() => {
    // Lọc danh sách bạn bè dựa trên giá trị tìm kiếm và cập nhật state mới
    const filtered = friendsDetails.filter(friend => friend.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredFriends(filtered);
  }, [searchValue, friendsDetails]); 
  const handleSearch = (text) => {
    setSearchValue(text); 
  };

  const handleDeleteFriendRequest = async (item) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().post('friend/cancel-friend-request', {
        idFriendSender: userId,
        idFriendReceiver: item._id
      });
      if (response && response.success) {
        // Xoá item khỏi danh sách filteredFriends và cập nhật lại FlatList
        setFilteredFriends(prevFriends => prevFriends.filter(friend => friend._id !== item._id));
        // Cập nhật lại danh sách bạn bè sau khi xoá thành công
        setFriendsDetails(prevFriends => prevFriends.filter(friend => friend._id !== item._id));
        // Cập nhật lại biến state refresh để FlatList render lại
        setRefresh(prevRefresh => !prevRefresh);
      } else if (response && response.message) {
        console.error('Error accepting friend request:', response.message);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleSortByName = () => {
    setSortByName(!sortByName); 
    if (!sortByName) {
      
      setFilteredFriends([...filteredFriends].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      
      setFilteredFriends([...filteredFriends].sort((a, b) => b.name.localeCompare(a.name)));
    }
  };

  
  // Hàm này được gọi khi người dùng kéo xuống để làm mới
  const onRefresh = async () => {
    setRefreshing(true); // Đặt trạng thái là đang làm mới
    await friendsDetails(); // Tải dữ liệu mới
    setRefreshing(false); // Kết thúc làm mới
  };

  const openDeleteModal = (friend) => {
    setSelectedFriendToDelete(friend);
    setDeleteModalVisible(true);
  };
  
  const confirmDeleteFriend = async () => {
    if (selectedFriendToDelete) {
      await handleDeleteFriendRequest(selectedFriendToDelete);
      setDeleteModalVisible(false);
    }
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
        <TouchableOpacity onPress={handleSortByName}>
          <Text style={styles.title}>Sắp xếp</Text>
        </TouchableOpacity>
      </View>
     
        <FlatList
          data={filteredFriends}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10,justifyContent:'space-between' }}>
             <View style={{ flexDirection: 'row',alignItems:'center'}}>
             <Image source={{ uri: item.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
              <Text style={styles.txtName}>{item.name}</Text>
             </View>
             <TouchableOpacity style={styles.imgOption}  onPress={() => openDeleteModal(item)}>
              <Text style={styles.txtXoas}>Xoá</Text>
            </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()} 
          extraData={refresh}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Thêm RefreshControl để xử lý làm mới
          }
        />

<Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Xoá <Text style={styles.highlightedText}>{selectedFriendToDelete ? selectedFriendToDelete.name : ''}</Text> khỏi danh sách bạn bè?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
             
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#d63031' ,marginRight:10}}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.textStyle}>Huỷ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#22b6c0',marginLeft:10 }}
                onPress={confirmDeleteFriend}
              >
                <Text style={styles.textStyle}>Đồng Ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AllFriend;
