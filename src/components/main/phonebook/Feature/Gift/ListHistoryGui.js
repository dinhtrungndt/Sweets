import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import AxiosInstance from '../../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
const TabBar2 = ({ active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tabItem, active && styles.activeTabItem]}
      onPress={onPress}
    >
      <Text style={styles.tabText}>Lịch sử</Text>
    </TouchableOpacity>
  );
}

export const Tab2Content = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleNavigate = (item) => {
    navigation.navigate('ReviewSeenHis', {
      wishText: item.content, 
      selectedImage: item.image, 
      avatar: item.senderDetails.avatar,
      name: item.senderDetails.name, 
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(`birthday/idSender/${userId}`);
      const invitations = response; // Lấy danh sách thông tin lời mời sinh nhật

      // Lấy thông tin cụ thể của mỗi idSender
      const senderDetailsPromises = invitations.map(async invitation => {
        const senderId = invitation.idReceiver; // Lấy idSender từ thông tin lời mời
        const senderResponse = await AxiosInstance().get(`/users/get-user/${senderId}`);
        const senderDetails = senderResponse.user; // Lấy thông tin cụ thể của idSender
        return { ...invitation, senderDetails }; // Kết hợp thông tin lời mời và thông tin của idSender
      });

      // Chờ tất cả các promises hoàn thành và lưu trữ thông tin vào state
      const senderDetails = await Promise.all(senderDetailsPromises);
      setData(senderDetails);
      setLoading(false);
      console.log('senderDetailssenderDetails', senderDetails)
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');

    if (diffInSeconds < 1) {
      return 'Vừa đăng';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
    } else {
      return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
         
            if (item.image) {
              return (
                <View style={styles.item}>
                 <View style={{flexDirection:'row'}}>
                 <Image
                    source={{ uri: item.senderDetails.avatar }}
                    style={{ width: 60, height: 60,marginTop:5, borderRadius: 30, borderWidth: 1, borderColor: 'lightgray', resizeMode: 'contain' }}
                  />
                  <View style={{margin:8,alignItems:'flex-start'}}>
                  <Text>Bạn đã gửi lời chúc cho</Text>
                    <Text style={styles.txtName}>{item.senderDetails.name}</Text>
                   
                    <Text style={styles.txtName2}>{formatTime(item.time)}</Text>
                  </View>

                  </View>

               <View style={{marginTop:5}}>
               <Image
                    source={{ uri: item.image }}
                    style={{ width: 40, height: 40,borderWidth:2,borderColor:'red', resizeMode: 'contain' }}
                  />
                  <TouchableOpacity style={{borderWidth:1,borderColor:'lightgray',padding:3,margin:4}}
                 onPress={() => handleNavigate(item)}>
                    <Text style={{fontSize:11,color: '#22b6c0'}} >Xem</Text>
                  </TouchableOpacity>
               </View>
                 
                </View>
              );
            } else {
              // Trả về một phần tử trống nếu item.image là null hoặc undefined
              return null;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  txtName:{
    fontSize:16,
    fontWeight:'bold'
  },
  txtName2:{
    fontSize:13,
    fontWeight:'600'
  },

});

export default TabBar2;
