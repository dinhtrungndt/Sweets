import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback,FlatList } from 'react-native';
import styles from '../styles/LoiMoiKetBanStyles';
//import AxiosInstance from '../../../../helper/Axiosinstance';
import AxiosInstance from '../../../../helper/AxiosinstanceText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoiMoiKetBan = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [friendInvitations, setFriendInvitations] = useState([]);
  const [sentFriendInvitations, setSentFriendInvitations] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchFriendInvitations = async () => {
      try {
         // Lấy userId từ AsyncStorage
         const userId = await AsyncStorage.getItem('userId');
         console.log('id tk222', userId);
        
        const response = await AxiosInstance().get(`/friend/friend-requests/${userId}`);
         console.log('xxxx',response)
        if (response.success) {
          setFriendInvitations(response.friendRequests);
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
      <Text>{item.idFriendSender} đã gửi lời mời kết bạn</Text>
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
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.friendItem}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Danh sách lời mời</Text>
        <TouchableOpacity style={styles.friendItem} onPress={toggleModal}>
          <Image source={require('../../../../assets/option.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapContent}>
        <Text style={styles.txtContent1}>Lời mời kết bạn</Text>
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
            <TouchableWithoutFeedback onPress={() => {}}>
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
