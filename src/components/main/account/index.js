/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({navigation}) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');

    navigation.replace('LoginScreen');
  };
  return (
    <View>
      <Text onPress={handleLogout}>Đăng xuất</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
