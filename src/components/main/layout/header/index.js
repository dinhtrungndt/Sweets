/* eslint-disable prettier/prettier */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { getAllLiveStream } from '../../../../services/livestream/LiveStreamService';
// styles
import {styles} from './styles/header';

// Library
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderScreen =  ({onRefresh, navigation}) => {
  const handleLiveStream =  () => {
    navigation.navigate('LiveStreamScreen');
  };
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
            onPress={() => 
              handleLiveStream()
            }>
            <Ionicons name="videocam" size={28} color="#ff0000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingLeft: 5}}
            onPress={() => navigation.navigate('SearchPosts')}>
            <Ionicons name="search-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container_noti}>
            <Text style={styles.lengthNoti}>2</Text>
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
