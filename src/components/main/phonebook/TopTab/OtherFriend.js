import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../helper/Axiosinstance';
import styles from '../styles/OtherFriendStyles';

const OtherFriend = (props) => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const loadFilteredUsers = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const storedData = await AsyncStorage.getItem('friendData');
        const friendsFromStorage = await AxiosInstance().get(`/friend/friends/${userId}`);
        const friendsResponse = await AxiosInstance().get('users/get-users');
        const friends = friendsResponse.users;

        const usersWithCommonFriends = friends.map(user => {
          if (user._id !== userId && user.friends) {
            const commonFriends = user.friends.filter(friendId => loggedInUser.friends.includes(friendId));
            return {
              ...user,
              commonFriendsCount: commonFriends.length,
              isFriend: !friendsFromStorage.friendsList.includes(user._id),
            };
          }
          return user;
        });
        const filteredUsers = usersWithCommonFriends.filter(
          user => user._id !== userId && !friendsFromStorage.friendsList.includes(user._id),
        );

        // Tính toán số lượng bạn chung và lưu vào mảng filteredUsers
        await Promise.all(filteredUsers.map(async (item) => {
          try {
            const response = await AxiosInstance().get(`/friend/friends/${item._id}`);
            const listFriendOther = response.friendsList;
            const matchingFriends = listFriendOther.filter(friend => storedData.includes(friend));
            item.matchingFriends = matchingFriends;

            // Gửi yêu cầu API để lấy thông tin về bạn chung
            const matchingFriendsInfo = await Promise.all(matchingFriends.map(async (friendId) => {
              try {
                const friendInfoResponse = await AxiosInstance().get(`/users/get-user/${friendId}`);
                console.log('friendInfoResponse', friendInfoResponse.user)
                const { avatar, name } = friendInfoResponse.user;
                return { avatar, name }; // Trả về thông tin của bạn bè chung
              } catch (error) {
                console.error('Lỗi khi lấy thông tin bạn bè:', error);
                return null;
              }
            }));
            // Gán matchingFriendsInfo vào item
            item.matchingFriendsInfo = matchingFriendsInfo;
            console.log('Thông tin bạn chunggggg:', matchingFriendsInfo);
          } catch (error) {
            console.error('Lỗi khi xem danh sách bạn bè:', error);
          }
        }));
        // console.log('filteredUsers',filteredUsers)

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
        time: 10
      });

      if (response && response.success) {
        const updatedUsers = filteredUsers.map(user => {
          if (user._id === selectedUserId) {
            return { ...user, isFriend: !user.isFriend };
          }
          return user;
        });
        setFilteredUsers(updatedUsers);
      } else if (response && !response.success) {
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
                  <TouchableOpacity style={styles.friendItem}>
                    <Image
                      source={{
                        uri: item.avatar || 'https://res.cloudinary.com/dztqqxnqr/image/upload/v1704255997/p1vdyjxbnmt8btfuqoab.jpg',
                      }}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.friendItemText}>{item.name}</Text>
                    <Text style={styles.friendItemText3}>Bạn chung: {item.matchingFriends ? item.matchingFriends.length : 0}</Text>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
  {item.matchingFriendsInfo && item.matchingFriendsInfo.length > 0 && (
    item.matchingFriendsInfo.slice(0, 1).map((friendInfo, index) => (
      <View key={index} style={{ flexDirection: 'row' }}>
        <Image source={{ uri: friendInfo.avatar }} style={{ width: 25, height: 25, borderRadius: 12 }} />
        <Text style={{ color: 'black',fontSize:13 }}>{friendInfo.name}</Text>
      </View>
    ))
  )}
  {item.matchingFriendsInfo && item.matchingFriendsInfo.length > 1 && (
    <Text style={{ color: 'black',fontSize:13 }}> và {item.matchingFriendsInfo.length - 1} bạn khác...</Text>
  )}
</View>

                  </View>
                </View>
                <TouchableOpacity style={styles.imgOption} onPress={() => handleFriendAction(item._id)}>
                  <Text style={styles.friendItemText2}>{item.isFriend ? 'Huỷ kết bạn' : 'Kết bạn'}</Text>
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
