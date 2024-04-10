import React, { useState, useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles/IndexStyles';
import AllFriend from './TopTab/AllFriend';
import NearFriend from './TopTab/NearFriend';
import MyModal from './modal/MDBirthday';
import OtherFriend from './TopTab/OtherFriend';

import { useNavigation } from '@react-navigation/native';

import QRCODE from './Feature/QRCODE';

const Tab = createMaterialTopTabNavigator();


const PhoneBookScreen = props => {
  const { navigation } = props;




  return (
    <NavigationContainer independent={true}>

      <View style={styles.wrapBackground}>
        <Text style={styles.txtFlat2}>Danh sách bạn bè</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 }}>
          <TouchableOpacity style={styles.imgOption} onPress={() => navigation.navigate('QuetQR')}>
            <Image source={require('../../../assets/qr-codess.png')} style={styles.buttonImg2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgOption} onPress={() => navigation.navigate('BothRes')}>
            <Image source={require('../../../assets/friend.png')} style={styles.buttonImg2} />
          </TouchableOpacity>
        </View>

      </View>
    

      

      <TouchableOpacity style={styles.ToQR} onPress={() => navigation.navigate('ThoiTiet')}>
        <Image source={require('../../../assets/cluold2.png')} style={styles.buttonImg3} />
        <Text style={styles.txtToQR}>Thời tiết hôm nay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ToQR} onPress={() => navigation.navigate('SinhNhat')}>
        <Image source={require('../../../assets/hppn2.png')} style={styles.buttonImg3} />
        <Text style={styles.txtToQR}>Sinh nhật sắp tới</Text>
      </TouchableOpacity>


      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabStyle: { width: 'auto' },
          style: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          activeTintColor: '#22b6c0',
          inactiveTintColor: '#bdc3c7',
          indicatorStyle: { backgroundColor: '#22b6c0' },
          activeBackgroundColor: '#22b6c0', // Thay đổi màu nền của tab hiện tại khi được chọn
        }}
      >
        <Tab.Screen name="Tất cả" component={AllFriend} />
        <Tab.Screen name="Gần đây" component={NearFriend} />
        <Tab.Screen name="Khác" component={OtherFriend} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PhoneBookScreen;
