import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList,Alert} from 'react-native';
import styles from '../styles/LoiMoiDaGuiStyles';
import AxiosInstance from '../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoiMoiDaGui = (props) => {
  const { navigation } = props;
  const [friendInvitations, setFriendInvitations] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
 
  
  useEffect(() => {
    fetchFriendInvitations();
  }, []);

  const fetchFriendInvitations = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(`/friend/friend-requests-sent/${userId}`);
      
      if (response.success) {
        setFriendInvitations(response.friendRequestsSent);
        const usersPromises = response.friendRequestsSent.map(async (invitation) => {
          const userResponse = await AxiosInstance().get(`/users/get-user/${invitation.idFriendReceiver}`);
          //console.log('userResponse.user',userResponse.user)
          return userResponse.user;
        });
        const users = await Promise.all(usersPromises);
        setUserInfo(users);
        const ListDaGui = users.map(obj => obj._id);;
        console.log('LítDagui',ListDaGui)
        await AsyncStorage.setItem('ListDaGui', JSON.stringify(ListDaGui));
        console.log('Mảng đã được lưu vào AsyncStorage');
      } else {
        console.log('No friend invitations found.');
      }
    } catch (error) {
      console.error('Error fetching friend invitations:', error);
    }
  };

  

  const handleDeleteFriendRequest = async (item) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().post('friend/reject-friend-request', {
        idFriendSender: userId,
        idFriendReceiver: item._id
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
          <Image source={{ uri: item.avatar }} style={{ width: 80, height:80, borderRadius: 40 }} />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', marginHorizontal: 10 }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
           
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
     
    
      <FlatList
        data={userInfo}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    

      
    </View>
  );
};

export default LoiMoiDaGui;

