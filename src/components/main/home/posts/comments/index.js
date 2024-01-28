/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

// styles
import {styles} from '../../styles/comments';

// library
import moment from 'moment';

const CommentsScreen = ({navigation, route}) => {
  const {postId} = route.params;
  const [posts, setPosts] = useState([postId]);

  console.log('>>>>>>>>>>>>>>>>> Comememtjsjsj' + posts);
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
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        {/* thông tin header */}
        <View style={styles.baiVietHeader}>
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.icon_backTO}>
              {/* <Image
                style={styles.icon_back}
                source={require('../../../../assets/icon_back.png')}
              /> */}
            </TouchableOpacity>
            <View style={styles.baiVietHeaderLeft}>
              {/* <Image
                style={styles.baiVietAvatar}
                source={{uri: idUsers.avatar}}
              /> */}
              <View style={styles.baiVietNameTime}>
                {/* <Text style={styles.baiVietName}>{idUsers.name}</Text>
                <Text style={styles.baiVietTime}>
                  {formatTime(comment.createAt)}
                </Text> */}
              </View>
            </View>
          </>
          <TouchableOpacity
            onPress={() => navigation.navigate('BottomSheetLayout', {postId})}
            style={styles.baiVietHeaderRight}>
            {/* <Image
              style={styles.baiVietHeaderRightIcon}
              source={require('../../../../assets/icon_more.png')}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentsScreen;
