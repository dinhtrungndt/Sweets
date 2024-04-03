/* eslint-disable prettier/prettier */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

// styles
import {styles} from './styles/header';

// Library
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderScreen = ({onRefresh}) => {
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
          <TouchableOpacity style={styles.container_search}>
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
