import React from 'react';
import { View, Text } from 'react-native';

const NearFriend = ({ route }) => {
  const newFriendInfo = route.params?.newFriendInfo;
console.log('newFriendInfo',newFriendInfo)
  return (
    <View>
      <Text>Thông tin của người dùng mới kết bạn:</Text>
      <Text>{newFriendInfo ? 'DD' : 'Không có thông tin'}</Text>
    </View>
  );
};

export default NearFriend;
