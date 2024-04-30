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
import AxiosInstance from '../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
// screens
import PostOtherScreen from './TopTabOther/PostOtherScreen';
import ImgOtherScreen from './TopTabOther/ImgOtherScreen';
import OtherStoryScreen from './TopTabOther/OtherStoryScreen';
// styles
import {styles} from '../style/otherUserA';
import {UserContext} from '../../../../contexts/user/userContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useTranslation} from 'react-i18next';
import {GetFriendById} from '../../../../services/home/friendService';

const Tab = createMaterialTopTabNavigator();

const OtherUserA = ({navigation, route}) => {
  const {account, accountzzz} = route?.params;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const [updatedListUserSearch, setUpdatedListUserSearch] = useState([]);

  // console.log('updatedListUserSearch', updatedListUserSearch);
  useEffect(() => {
    const fetchFriendsCount = async () => {
      try {
        const response = await GetFriendById(account.idUsers._id);
        // console.log('response:', response.friendsList.length);
        setFriendsCount(response.friendsList.length);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng bạn bè:', error);
      }
    };
    fetchFriendsCount();
    fetchFriendInvitations();
  }, [account]);

  const fetchFriendInvitations = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(
        `/friend/friend-requests-sent/${userId}`,
      );
      const response2 = await AxiosInstance().get(
        `/friend/friend-requests/${userId}`,
      );
      const response3 = await AxiosInstance().get(`/friend/friends/${userId}`);
      // console.log('re', response3);
      if (response.success) {
        // console.log('Kết quả lời mời đã gửi', response.friendRequestsSent);
        const invitations = response.friendRequestsSent; //mảng đã gửi
        const listUserSearch = [account];
        const updatedList = listUserSearch.map(user => {
          const isInvited = invitations.some(
            invitation => invitation.idFriendReceiver === user.idUsers._id,
          );
          return {
            ...user,
            CheckGui: isInvited, // Kiểm tra xem user có trong danh sách lời mời gửi không
            CheckNhan: false, // Ban đầu, chưa có lời mời nào được chấp nhận
            CheckALL: false,
          };
        });
        const invitations2 = response2.friendRequests;
        const updatedList2 = updatedList.map(user => {
          const isInvited = invitations2.some(
            invitation => invitation.idFriendSender === user.idUsers._id,
          );
          return {
            ...user,

            CheckNhan: isInvited, // Ban đầu, chưa có lời mời nào được chấp nhận
          };
        });

        const invitationsAll = response3.friendsList;
        const updatedListAll = updatedList2.map(user => {
          const isInvited = invitationsAll.some(
            invitation => invitation.id === user.idUsers._id,
          );
          return {
            ...user,

            CheckALL: isInvited, // Ban đầu, chưa có lời mời nào được chấp nhận
          };
        });
        // console.log('updatedListAll', updatedListAll);
        // console.log('mảng 33333', updatedListAll);
        setUpdatedListUserSearch(updatedListAll);
      } else {
        console.log('No friend invitations found.');
      }
    } catch (error) {
      console.error('Error fetching friend invitations:', error);
    }
  };

  const handleButtonPress = (account, actionType) => {
    return () => {
      handleFriendAction(account, actionType);
    };
  };

  const handleFriendAction = async (account, actionType) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      let endpoint = '';
      let requestData = {}; // Object chứa dữ liệu cần truyền vào endpoint

      switch (actionType) {
        case 'addFriend':
          endpoint = '/friend/send-friend-request';
          requestData = {
            idFriendSender: userId,
            idFriendReceiver: account.idUsers._id,
          };
          break;
        case 'backRequest':
          endpoint = 'friend/reject-friend-request';
          requestData = {
            idFriendSender: userId,
            idFriendReceiver: account.idUsers._id,
          };
          break;
        // Các case khác tương tự
        case 'acceptRequest':
          endpoint = 'friend/accept-friend-request';
          requestData = {
            idFriendSender: account.idUsers._id,
            idFriendReceiver: userId,
          };
          break;
        case 'unfriend':
          endpoint = 'friend/cancel-friend-request';
          requestData = {
            idFriendSender: userId,
            idFriendReceiver: account.idUsers._id,
          };
          break;
        default:
          // Mặc định là 'addFriend' nếu không có hành động nào được xác định
          endpoint = '/friend/send-friend-request';
          requestData = {
            idFriendSender: userId,
            idFriendReceiver: account.idUsers._id,
            // Các thuộc tính khác cho mặc định nếu cần
          };
      }

      const response = await AxiosInstance().post(endpoint, requestData);
      // console.log('responesss', response);
      fetchFriendInvitations();
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu kết bạn:', error);
    }
  };

  return (
    <>
      {updatedListUserSearch === undefined ? (
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
            <Text style={styles.textName}>{accountzzz?.name}</Text>
            <View style={styles.containerFriends}>
              <Text style={styles.txtFriendsNumber}>{friendsCount}</Text>
              <Text style={styles.txtFriends}>{t('friends')}</Text>
            </View>
            <View style={styles.containerAdd}>
              <TouchableOpacity style={styles.btnAddFriend}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Thêmm bạn bèe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnMess}>
                <Image
                  style={styles.imgEdit}
                  source={require('../../../../assets/icon_chat.png')}
                />
                <Text style={styles.txtEdit}>Nhắn tinnnnnnn</Text>
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
            {/* <Tab.Screen
              name="Bài viết"
              posts={userData}
              component={PostOtherScreen}
            /> */}
            {/* <Tab.Screen name="Ảnh" component={ImgOtherScreen} /> */}
          </Tab.Navigator>
        </View>
      ) : accountzzz === undefined ? (
        <View style={styles.body}>
          <View style={styles.profileFrame}>
            {account.idUsers?.coverImage === 'null' ||
            account.idUsers?.coverImage === 'default' ? (
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
                  source={{uri: account.idUsers?.coverImage}}
                />
              </TouchableOpacity>
            )}
            {updatedListUserSearch.idUsers?.avatar === 'null' ? (
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
                  source={{uri: account.idUsers?.avatar}}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.textName}>{account.idUsers?.name}</Text>
            <View style={styles.containerFriends}>
              <Text style={styles.txtFriendsNumber}>{friendsCount}</Text>
              <Text style={styles.txtFriends}>{t('friends')}</Text>
            </View>
            {/* {console.log(
              'updatedListUserSearchupdatedListUserSearch',
              updatedListUserSearch[0]?.CheckGui,
            )} */}
            <View style={styles.containerAdd}>
              {!updatedListUserSearch[0]?.CheckGui &&
              !updatedListUserSearch[0]?.CheckNhan &&
              !updatedListUserSearch[0]?.CheckALL ? (
                <TouchableOpacity
                  style={styles.btnAddFriend}
                  onPress={handleButtonPress(account, 'addFriend')}>
                  <Image
                    style={styles.imgAddFriend}
                    source={require('../../../../assets/icon_add_friends.png')}
                  />
                  <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
                </TouchableOpacity>
              ) : updatedListUserSearch[0]?.CheckGui ? (
                <>
                  <TouchableOpacity
                    style={styles.btnAddFriend}
                    onPress={handleButtonPress(account, 'backRequest')}>
                    <Image
                      style={styles.imgAddFriend}
                      source={require('../../../../assets/icon_add_friends.png')}
                    />
                    <Text style={styles.textIntroduce}>Thu hồi</Text>
                  </TouchableOpacity>
                </>
              ) : updatedListUserSearch[0]?.CheckNhan ? (
                <TouchableOpacity
                  style={styles.btnAddFriend}
                  onPress={handleButtonPress(account, 'acceptRequest')}>
                  <Image
                    style={styles.imgAddFriend}
                    source={require('../../../../assets/icon_add_friends.png')}
                  />
                  <Text style={styles.textIntroduce}>Đòng ý</Text>
                </TouchableOpacity>
              ) : updatedListUserSearch[0]?.CheckALL ? (
                <TouchableOpacity
                  style={styles.btnAddFriend}
                  onPress={handleButtonPress(account, 'unfriend')}>
                  <Image
                    style={styles.imgAddFriend}
                    source={require('../../../../assets/icon_add_friends.png')}
                  />
                  <Text style={styles.textIntroduce}>Bạn bè</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.btnAddFriend}>
                  <Image
                    style={styles.imgAddFriend}
                    source={require('../../../../assets/icon_add_friends.png')}
                  />
                  <Text style={styles.textIntroduce}>xxx</Text>
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
              initialParams={{account: account, accountzzz: accountzzz}}
              component={PostOtherScreen}
            />
            <Tab.Screen
              name="Ảnh"
              initialParams={{account: account}}
              component={ImgOtherScreen}
            />
            <Tab.Screen
              name="Story"
              initialParams={{account: account}}
              component={OtherStoryScreen}
            />
          </Tab.Navigator>
        </View>
      ) : null}
    </>
  );
};

export default OtherUserA;
