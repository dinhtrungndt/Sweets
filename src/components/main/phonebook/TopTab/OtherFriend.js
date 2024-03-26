import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../helper/Axiosinstance';
import styles from '../styles/OtherFriendStyles';

const OtherFriend = (props) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friendStatus, setFriendStatus] = useState('Kết bạnn');
 

  useEffect(() => {
    const loadFilteredUsers = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const friendsFromStorage = await AxiosInstance().get(`/friend/friends/${userId}`);
        const friendsResponse = await AxiosInstance().get('users/get-users');
        const friends = friendsResponse.users;

        const usersWithCommonFriends = friends.map(user => {
          if (user._id !== userId && user.friends) {
            const commonFriends = user.friends.filter(friendId => loggedInUser.friends.includes(friendId));
            return {
              ...user,
              commonFriendsCount: commonFriends.length,
            };
          }
          return user;
        });

        const filteredUsers = usersWithCommonFriends.filter(
          user => user._id !== userId && !friendsFromStorage.friendsList.includes(user._id),
        );

        setFilteredUsers(filteredUsers);
      } catch (error) {
        console.log('Lỗi khi tải danh sách bạn bè', error);
      }
    };

    loadFilteredUsers();
  }, []);

  const handleFriendAction = async (selectedUserId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
  
      const response = await AxiosInstance().post('/friend/send-friend-request', {
        idFriendSender: userId,
        idFriendReceiver: selectedUserId,
        time:10
      });

      console.log('res',response)
  
      if (response && response.success) {
        if (response.message == "Gửi lời mời kết bạn thành công") {
          setFriendStatus('Hủy kết bạn');
        } 
      } else if (response  && !response.success) {
        console.error('Lỗi khi gửi yêu cầu kết bạn:', response.message);
      } 
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu kết bạn:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Có thể bạn muốn kết bạn</Text>

      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <TouchableOpacity style={styles.friendItem} >
                    <Image
                      source={{
                        uri: item.avatar || 'https://res.cloudinary.com/dztqqxnqr/image/upload/v1704255997/p1vdyjxbnmt8btfuqoab.jpg',
                      }}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.friendItemText}>{item.name}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.imgOption} onPress={() => handleFriendAction(item._id)}>
                  <Text style={styles.friendItemText2}>{friendStatus}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noFriendsMessage}>No other friends available</Text>
      )}
    </View>
  );
};

export default OtherFriend;
