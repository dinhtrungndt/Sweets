import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GetListUserById } from '../../../../services/user/userService';
import PostOtherScreen from './TopTabOther/PostOtherScreen';
import ImgOtherScreen from './TopTabOther/ImgOtherScreen';
import { styles } from '../style/otherUserA';
import { UserContext } from '../../../../contexts/user/userContext';
import AxiosInstance from '../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialTopTabNavigator();

const OtherUserA = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // State để lưu thông tin người dùng
  const [parsedListDaGui, setParsedListDaGui] = useState([]);
  const [parsedListDaNhan, setparsedListDaNhan] = useState([]);
  const [parsedListAll, setparsedListAll] = useState([]);

  const { account } = route.params; // Lấy dữ liệu từ route.params
  const [loading2, setLoading2] = useState(false);
  // Sử dụng biến tạm để lưu trữ dữ liệu cần hiển thị
  //tra xem userData có được truyền từ mã QR không
  useEffect(() => {
    const loadFilteredUsers = async () => {
      try {
        // Lấy dữ liệu từ AsyncStorage
        const storedData = await AsyncStorage.getItem('friendData');
        console.log('Mảng đã lấy từ AsyncStorageAll:', storedData.id);
        const parsedListAll = JSON.parse(storedData);
        setparsedListAll(parsedListAll)
        const ListDaGui = await AsyncStorage.getItem('ListDaGui');
        const parsedListDaGui = JSON.parse(ListDaGui);
      //  console.log('Mảng đã lấy từ AsyncStorageGui:', parsedListDaGui);
        setParsedListDaGui(parsedListDaGui);
        const ListDaNhan = await AsyncStorage.getItem('ListDaNhan');
        const parsedListDaNhan = JSON.parse(ListDaNhan);
     //   console.log('Mảng đã lấy từ AsyncStorageNhan:', parsedListDaNhan);
  setparsedListDaNhan(parsedListDaNhan)

        // Xử lý dữ liệu đã lấy được (nếu cần)
        
      } catch (error) {
        console.log('Lỗi khi tải danh sách bạn bè', error);
      }
    };
  
    // Gọi hàm để tải dữ liệu từ AsyncStorage khi component được render
    loadFilteredUsers();
  
    // Nếu có userData từ route.params, cập nhật state
    if (route.params && route.params.userData) {
      setUserData(route.params.userData);
    }
  }, [route.params]);
  


  
  // Sử dụng userData nếu có, ngược lại sử dụng account
  const displayData = userData || (route.params && route.params.account && route.params.account.idUsers);
  
  console.log('route.params.userData', userData);
  //console.log('displayData', displayData);
  
  console.log('account',account)
console.log('displayData',displayData)


const handleFriendAction = async (selectedUserId) => {
  try {
    setLoading2(true);
    const userId = await AsyncStorage.getItem('userId');

    const response = await AxiosInstance().post('/friend/send-friend-request', {
      idFriendSender: userId,
      idFriendReceiver: displayData._id,
     
    });

    if (response && response.success) {
      console.log('Friend request sent successfully', response.message);
    } else if (response && !response.success) {
      console.error('Lỗi khi gửi yêu cầu kết bạn:', response.message);
    }
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu kết bạn:', error);
  }
};

  return (
   <View style={styles.body}>
  <View style={styles.profileFrame}>
    {displayData && (displayData.coverImage === 'null' || displayData.coverImage === 'default') ? (
      <TouchableOpacity>
        <Image
          style={styles.imgCover}
          source={require('../../../../assets/account.png')}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Image
          style={styles.imgCover}
          source={{ uri: displayData?.coverImage || account?.idUsers?.coverImage }}
        />
      </TouchableOpacity>
    )}
    {displayData?.avatar === 'null' ? (
      <TouchableOpacity>
        <Image
          style={styles.imgAvatar}
          source={require('../../../../assets/account.png')}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Image
          style={styles.imgAvatar}
          source={{ uri: displayData?.avatar || account?.idUsers?.avatar }}
        />
      </TouchableOpacity>
    )}
    <Text style={styles.textName}>{displayData?.name || account?.idUsers?.name}</Text>
    <View style={styles.containerAdd}>
      <TouchableOpacity style={styles.btnAddFriend}
       onPress={handleFriendAction}
       disabled={loading2}
      
      >
        <Image
          style={styles.imgAddFriend}
          source={require('../../../../assets/icon_add_friends.png')}
        />
          <Text style={styles.textIntroduce}>
          {parsedListDaGui.includes(displayData._id) ? 'Thu hồi' : parsedListDaNhan.includes(displayData._id) ? 'Đồng ý'  : parsedListAll.some(obj => obj.id === displayData._id)  ? 'Bạn bè':'Thêm bạn bè'}
  </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnMess}>
        <Image
          style={styles.imgEdit}
          source={require('../../../../assets/icon_chat.png')}
        />
        <Text style={styles.txtEdit}>Nhắn tin</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.editFrame}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnBack}>
        <Image
          style={styles.imgBack}
          source={require('../../../../assets/back_50px.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnMore}>
        <Image
          style={styles.imgMore}
          source={require('../../../../assets/icon_more_story.png')}
        />
      </TouchableOpacity>
    </View>
  </View>

  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left'
      },
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        marginTop: 6,
      },
      tabBarActiveTintColor: '#22b6c0',
      tabBarInactiveTintColor: '#bdc3c7',
      tabBarIndicatorStyle: {
        backgroundColor: '#22b6c0',
      },
      tabBarPressColor: 'rgba(0,0,0,0.1)',
    }}>
    <Tab.Screen name="Bài viết" posts={displayData} component={PostOtherScreen} />
    <Tab.Screen name="Ảnh" component={ImgOtherScreen} />
  </Tab.Navigator>
</View>

  );
};

export default OtherUserA;
