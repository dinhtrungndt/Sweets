import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList,Modal, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/LoiMoiKetBanStyles';
import AxiosInstance from '../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoiMoiKetBan = (props) => {
  const { navigation } = props;
  const [friendInvitations, setFriendInvitations] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    fetchFriendInvitations();
  }, []);

  const fetchFriendInvitations = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(`/friend/friend-requests/${userId}`);
      if (response.success) {
        setFriendInvitations(response.friendRequests);
        const usersPromises = response.friendRequests.map(async (invitation) => {
          const userResponse = await AxiosInstance().get(`/users/get-user/${invitation.idFriendSender}`);
          return userResponse.user;
        });
        const users = await Promise.all(usersPromises);
        console.log('users',users.length)
        await AsyncStorage.setItem('Count', users.length.toString()); 
        setUserInfo(users);
      
  const ListDanhan = users.map(obj => obj._id);

  console.log('ListDanhan', ListDanhan);
        await AsyncStorage.setItem('ListDaNhan', JSON.stringify(ListDanhan));
        console.log('Mảng đã được lưu vào AsyncStorage22');
      } else {
        console.log('No friend invitations found.');
      }
    } catch (error) {
      console.error('Error fetching friend invitations:', error);
    }
  };

  const handleAcceptFriendRequest = async (item) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().post('friend/accept-friend-request', {
        idFriendSender: item._id,
        idFriendReceiver: userId
      });
      if (response && response.success) {
       await setFriendInvitations(prevInvitations => prevInvitations.filter(invitation => invitation._id !== item._id));
       await setUserInfo(prevUsers => prevUsers.filter(user => user._id !== item._id));
      }  else if (response && response.message) {
        console.error('Error accepting friend request:', response.data.message);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDeleteFriendRequest = async (item) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().post('friend/reject-friend-request', {
        idFriendSender: item._id,
        idFriendReceiver: userId
      });
      if (response && response.success) {
      await  setFriendInvitations(prevInvitations => prevInvitations.filter(invitation => invitation._id !== item._id));
      await  setUserInfo(prevUsers => prevUsers.filter(user => user._id !== item._id));
      }  else if (response && response.message) {
        console.error('Error accepting friend request:', response.message);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };


  const renderItem = ({ item }) => (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', margin: 6 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: item.avatar }} style={{ width: 65, height: 65, borderRadius: 33 }} />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginHorizontal: 10 }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity style={styles.imgOption2} onPress={() => handleAcceptFriendRequest(item)}>
              <Text style={styles.txtXoas2}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imgOption}  onPress={() => handleDeleteFriendRequest(item)}>
              <Text style={styles.txtXoas}>Xoá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

 

  return (
    <View>
    
      <View style={styles.wrapContent2}>
        <Text style={styles.txtContent11}>Lời mời kết bạn</Text>
        <Text style={styles.txtContent2}>Sắp xếp</Text>
      </View>
      <FlatList
        data={userInfo}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
       
        onBackdropPress={toggleModal} 
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
              <TouchableOpacity  
              style={{height:20}}
              >
                <Text style={{fontWeight:'bold',fontSize:18,color:'black'}}>Xem danh sách đã gửi kết bạn</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default LoiMoiKetBan;
