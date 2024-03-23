import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import styles from '../styles/LoiMoiKetBanStyles';
import AxiosInstance from '../../../../helper/Axiosinstance';
//import AxiosInstance from '../../../../helper/AxiosinstanceText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoiMoiKetBan = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [friendInvitations, setFriendInvitations] = useState([]);
  const [sentFriendInvitations, setSentFriendInvitations] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchFriendInvitations = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await AxiosInstance().get(`/friend/friend-requests/${userId}`);
        if (response.success) {
          setFriendInvitations(response.friendRequests);
          // Lấy thông tin người dùng của người gửi lời mời kết bạn
          const usersPromises = response.friendRequests.map(async (invitation) => {
            const userResponse = await AxiosInstance().get(`/users/get-user/${invitation.idFriendSender}`);
            console.log('infoo', userResponse.user.name);
            return userResponse.user;
          });

          console.log('infoo2', usersPromises); // Di chuyển đến ngoài vòng lặp

          const users = await Promise.all(usersPromises);
          console.log('inusersssssfo', users);
          setUserInfo(users); // Lưu thông tin người dùng vào state

        } else {
          console.log('No friend invitations found.');
        }
      } catch (error) {
        console.error('Error fetching friend invitations:', error);
      }
    };

    fetchFriendInvitations();
  }, []);


  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>

      {userInfo && userInfo.length > 0 && (
        userInfo.map(user => (
          <View
            style={{ flexDirection: 'row', margin: 11 }}
            key={user._id}>

            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: user.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />

            </View>



            <View style={{ flexDirection: 'column' }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: 10
              }}> {user.name}</Text>

              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity style={styles.imgOption2}>
                  <Text style={styles.txtXoas}>Chấp nhận</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.imgOption}>
                  <Text style={styles.txtXoas}>Xoá</Text>
                </TouchableOpacity>
              </View>
            </View>





          </View>
        ))
      )}
    </View>
  );



  const handleSeeSentInvitations = async () => {
    try {
      // Gọi API để lấy danh sách lời mời kết bạn đã gửi
      const userId = await AsyncStorage.getItem('userId');
      console.log('id tk222', userId);

      const response = await AxiosInstance().get(`/friend/friend-requests-sent/${userId}`);
      console.log('Sent friend invitations:', response);

      // Xử lý dữ liệu nếu cần
      // Cập nhật state sentFriendInvitations
      setSentFriendInvitations(response.friendRequestsSent);

    } catch (error) {
      console.error('Error fetching sent friend invitations:', error);
    }
  };

  return (
    <View>
      <View style={styles.wrapContent1}>
        <TouchableOpacity style={styles.friendItem}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Danh sách lời mời</Text>
        <TouchableOpacity style={styles.friendItem} onPress={toggleModal}>
          <Image source={require('../../../../assets/option.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapContent2}>
        <Text style={styles.txtContent11}>Lời mời kết bạn</Text>
        <Text style={styles.txtContent2}>Sắp xếp</Text>
      </View>

      <FlatList
        data={friendInvitations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Xem lời mời kết bạn đã gửi</Text>
                <TouchableOpacity onPress={handleSeeSentInvitations} style={styles.viewSentInvitationsButton}>
                  <Text style={styles.viewSentInvitationsButtonText}>Xem danh sách</Text>
                </TouchableOpacity>
                {/* Hiển thị danh sách bạn bè đã gửi lời mời */}
                {sentFriendInvitations.length > 0 && sentFriendInvitations.map((invitation) => (
                  <View key={invitation._id}>
                    <Text>{invitation.idFriendReceiver} - Status: {invitation.status}</Text>
                  </View>
                ))}
                {/* Bạn có thể thêm các phần tử khác vào đây */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default LoiMoiKetBan;
