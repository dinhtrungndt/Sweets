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

const Tab = createMaterialTopTabNavigator();

const OtherUserA = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // State để lưu thông tin người dùng

  const { account } = route.params; // Lấy dữ liệu từ route.params

  // Sử dụng biến tạm để lưu trữ dữ liệu cần hiển thị
  //tra xem userData có được truyền từ mã QR không
  useEffect(() => {
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
      <TouchableOpacity style={styles.btnAddFriend}>
        <Image
          style={styles.imgAddFriend}
          source={require('../../../../assets/icon_add_friends.png')}
        />
        <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
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
