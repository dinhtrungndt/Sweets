/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    // Xóa thông tin đăng nhập từ AsyncStorage
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
    } catch (error) {
      console.log('Lỗi khi xóa thông tin đăng nhập:', error);
    }
    setUser(null);

    navigation.navigate('LoginScreen');
  };

  return (
    <View>
      <Text onPress={handleLogout} style={{textAlign: 'center', fontSize: 40}}>
        Đăng xuất
      </Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
