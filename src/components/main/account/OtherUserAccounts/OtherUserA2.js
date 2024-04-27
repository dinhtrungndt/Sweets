/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AxiosInstance from '../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
// screens
import PostOtherScreen2 from './TopTabOther2/PostOtherScreen2';
import ImgOtherScreen2 from './TopTabOther2/ImgOtherScreen2'
import OtherStoryScreen2 from './TopTabOther2/OtherStoryScreen2';
// styles
import { styles } from '../style/otherUserA';
import { UserContext } from '../../../../contexts/user/userContext';;
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useTranslation } from 'react-i18next';
import { GetFriendById } from '../../../../services/home/friendService';

const Tab = createMaterialTopTabNavigator();

const OtherUserA2 = ({ navigation, route }) => {
  const { accountzzz } = route?.params;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);

  // console.log('>>>>>>>>> accountzzz', accountzzz);

  useEffect(() => {
    const fetchFriendsCount = async () => {
      try {
        const response = await GetFriendById(accountzzz._id);
        console.log('response:', response.friendsList.length);
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
                source={{ uri: accountzzz?.coverImage }}
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
                source={{ uri: accountzzz?.avatar }}
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
            initialParams={{ account: accountzzz }}
            component={PostOtherScreen2}
          />
          <Tab.Screen
            name="Ảnh"
            initialParams={{ account: accountzzz }}
            component={ImgOtherScreen2}
          />
          <Tab.Screen
            name="Story"
            initialParams={{ account: accountzzz }}
            component={OtherStoryScreen2}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default OtherUserA2;
