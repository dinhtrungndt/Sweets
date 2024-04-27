/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GetListUserById} from '../../../../services/user/userService';
// screens
import PostOtherScreen2 from './TopTabOther2/PostOtherScreen2';
import ImgOtherScreen2 from './TopTabOther2/ImgOtherScreen2';
import OtherStoryScreen2 from './TopTabOther2/OtherStoryScreen2';
// styles
import {styles} from '../style/otherUserA';
import {UserContext} from '../../../../contexts/user/userContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../helper/Axiosinstance';
import {useTranslation} from 'react-i18next';
import {GetFriendById} from '../../../../services/home/friendService';
const Tab = createMaterialTopTabNavigator();

const OtherUserA2 = ({navigation, route}) => {
  const {accountzzz} = route?.params;
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [checkGui, setcheckGui] = useState(false);
  const [checkNhan, setcheckNhan] = useState(false);
  const [friendActionCounter, setFriendActionCounter] = useState(0);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friendsCount, setFriendsCount] = useState([]);
  const {t} = useTranslation();

  // console.log('>>>>>>>>> accountzzz', accountzzz);
  useEffect(() => {
    fetchFriendInvitations();
    fetchFriendSentInvitations();
  }, []);

  useEffect(() => {
    if (friendActionCounter > 0) {
      fetchFriendInvitations();
    }
  }, [friendActionCounter]);

  //console.log('>>>>>>>>> accountzz2z', accountzzz);

  const handleFriendAction = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const response = await AxiosInstance().post(
        '/friend/send-friend-request',
        {
          idFriendSender: userId,
          idFriendReceiver: accountzzz._id,
        },
      );

      if (response && response.success) {
        // Cập nhật lại thuộc tính checkGui của user sau khi gửi yêu cầu kết bạn thành công

        setFriendActionCounter(prevCounter => prevCounter + 1);
        setcheckGui(true);
      } else if (response && !response.success) {
        console.error('Lỗi khi gửi yêu cầu kết bạn:', response.message);
        c;
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu kết bạn:', error);
    }
  };

  const fetchFriendInvitations = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(
        `/friend/friend-requests-sent/${userId}`,
      );

      if (response.success) {
        // console.log('Kết quả lời mời đã gửi', response.friendRequestsSent);
        const isFriendRequestSent = response.friendRequestsSent.some(
          request => request.idFriendReceiver === accountzzz._id.toString(),
        );

        // console.log('checkGui', isFriendRequestSent);
        setcheckGui(isFriendRequestSent);
      } else {
        console.log('No friend invitations found.');
      }
    } catch (error) {
      console.error('Error fetching friend invitations:', error);
    }
  };

  const fetchFriendSentInvitations = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(
        `/friend/friend-requests/${userId}`,
      );

      if (response.success) {
        // console.log('Kết quả lời mời đã nhận', response.friendRequests);
        const isFriendRequestSent = response.friendRequests.some(
          request => request.idFriendSender === accountzzz._id.toString(),
        );

        // console.log('checkNhạn', isFriendRequestSent);
        setcheckNhan(isFriendRequestSent);
      } else {
        console.log('No friend invitations found.');
      }
    } catch (error) {
      console.error('Error fetching friend invitations:', error);
    }
  };

  useEffect(() => {
    const fetchFriendsCount = async () => {
      try {
        const response = await GetFriendById(accountzzz._id);
        // console.log('response:', response.friendsList.length);
        setFriendsCount(response.friendsList.length);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng bạn bè:', error);
      }
    };
    fetchFriendsCount();
  }, [accountzzz]);

  return (
    <>
      <View style={styles.body}>
        <View style={styles.profileFrame}>
          {accountzzz?.coverImage === 'null' ||
          accountzzz?.coverImage === 'default' ? (
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
                source={{uri: accountzzz?.coverImage}}
              />
            </TouchableOpacity>
          )}
          {accountzzz?.avatar === 'null' ? (
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
                source={{uri: accountzzz?.avatar}}
              />
            </TouchableOpacity>
          )}
          {/* <Text style={styles.textName}>{userData.name}</Text> */}
          <Text style={styles.textName}>{accountzzz?.name}</Text>
          <View style={styles.containerFriends}>
            <Text style={styles.txtFriendsNumber}>{friendsCount}</Text>
            <Text style={styles.txtFriends}>{t('friends')}</Text>
          </View>
          <View style={styles.containerAdd}>
            {/* {console.log('checkGuiReturn', checkGui)}
            {console.log('checNhaniReturn', checkNhan)} */}
            {!checkGui && !checkNhan ? (
              <TouchableOpacity
                style={styles.btnAddFriend}
                onPress={handleFriendAction}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
              </TouchableOpacity>
            ) : checkGui ? (
              <TouchableOpacity
                style={styles.btnAddFriend}
                onPress={handleFriendAction}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Thu hồi</Text>
              </TouchableOpacity>
            ) : checkNhan ? (
              <TouchableOpacity
                style={styles.btnAddFriend}
                onPress={handleFriendAction}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Đòng ý</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnAddFriend}
                onPress={handleFriendAction}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
              </TouchableOpacity>
            )}
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
              <Ionicons
                name="chevron-back"
                style={styles.imgBack}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMore}>
              <Fontisto name="share-a" style={styles.imgMore} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#22b6c0',
            tabBarInactiveTintColor: '#bdc3c7',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarItemStyle: {
              width: 'auto',
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#22b6c0',
            },
            tabBarStyle: {
              backgroundColor: '#FFF',
              elevation: 1,
              marginTop: 6,
            },
          }}>
          <Tab.Screen
            name="Bài viết"
            initialParams={{account: accountzzz}}
            component={PostOtherScreen2}
          />
          <Tab.Screen
            name="Ảnh"
            initialParams={{account: accountzzz}}
            component={ImgOtherScreen2}
          />
          <Tab.Screen
            name="Story"
            initialParams={{account: accountzzz}}
            component={OtherStoryScreen2}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default OtherUserA2;
