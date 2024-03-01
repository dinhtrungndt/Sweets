import React, { useEffect, useContext, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../helper/Axiosinstance';
import styles from '../styles/OtherFriendStyles';
const OtherFriend = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const loadFilteredUsers = async () => {
      try {
        // Lấy userId từ AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        console.log('id tk', userId);
        const friendsFromStorage = await AsyncStorage.getItem('friends');
        console.log('ddddddd', friendsFromStorage);
        // Gọi API để lấy danh sách bạn bè
        const friendsResponse = await AxiosInstance().get('users/get-users');
        const friends = friendsResponse.users;

        // Chuyển đổi friendsFromStorage từ chuỗi JSON thành mảng
        const friendsArray = JSON.parse(friendsFromStorage) || [];

        // Lọc ra những người dùng không phải là bạn bè của tôi và không phải là tôi
        const filteredFriends = friends.filter(user => user._id !== userId && !friendsArray.includes(user._id));

        console.log(filteredFriends);

        setFilteredUsers(filteredFriends);
      } catch (error) {
        console.log('Lỗi khi tải danh sách bạn bè', error);
      }
    };

    loadFilteredUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Có thể bạn muốn kết bạn</Text>

      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
           <View>
            <TouchableOpacity style={styles.friendItem}>
             <Image source={{ uri: item.avatar || 'https://res.cloudinary.com/dztqqxnqr/image/upload/v1704255997/p1vdyjxbnmt8btfuqoab.jpg' }} style={styles.avatar} />
             <Text style={styles.friendItemText}>{item.name}</Text>
            </TouchableOpacity>
           
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