/* eslint-disable prettier/prettier */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {getAllLiveStream} from '../../../../services/livestream/LiveStreamService';
// styles
import {styles} from './styles/header';

// Library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getNotificationRecipient} from '../../../../services/home/homeService';
import {UserContext} from '../../../../contexts/user/userContext';
import Toast from 'react-native-toast-message';
import moment from 'moment';

const HeaderScreen = ({onRefresh, navigation}) => {
  const [listNotifi, setListNotifiRecipi] = useState([]);
  const {user} = useContext(UserContext);

  const handleLiveStream = () => {
    navigation.navigate('LiveStreamScreen');
  };

  const onGetNotifiRecipi = async () => {
    try {
      const res = await getNotificationRecipient(user.user._id);
      setListNotifiRecipi(res);
    } catch (error) {
      console.log('error onGetNotifiRecipi', error);
    }
  };

  const showToast = () => {
    const currentTime = moment();
    const postTime = moment(listNotifi[0].createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');
    if (diffInSeconds < 24 * 3600) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: `Bạn có thông báo ${listNotifi.length} mới ! ${listNotifi[0].content}`,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onPress: () => {
          navigation.navigate('NotificationsScreen');
        },
      });
    }
  };

  useEffect(() => {
    onGetNotifiRecipi();
  }, []);

  useEffect(() => {
    if (listNotifi.length > 0) {
      showToast();
    }
  }, [listNotifi]);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onRefresh}>
          <Image
            style={styles.logoHeader}
            source={require('../../../../assets/sweets_ngnag.png')}
          />
        </TouchableOpacity>
        <View style={styles.towEnd_Noti_Search}>
          <TouchableOpacity
            style={{paddingRight: 5}}
            onPress={() => handleLiveStream()}>
            <Ionicons name="videocam" size={28} color="#ff0000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingLeft: 5}}
            onPress={() => navigation.navigate('SearchPosts')}>
            <Ionicons name="search-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container_noti}
            onPress={() => navigation.navigate('NotificationsScreen')}>
            <Text style={styles.lengthNoti}>{listNotifi.length}</Text>
            <Ionicons name="notifications-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {/* line */}
      <Text style={styles.line} />
    </View>
  );
};

export default HeaderScreen;
