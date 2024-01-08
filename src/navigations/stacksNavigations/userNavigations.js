/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from '../../components/user/login/Login';
import SignUpScreens from '../../components/user/signup/SingUp';
import SignUpBg from '../../components/user/signup/SignUpBg';

const StacK = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <StacK.Navigator screenOptions={{headerShown: false}}>
      <StacK.Screen name="LoginScreens" component={LoginScreens} />
      <StacK.Screen name="SignUpScreens" component={SignUpScreens} />
      <StacK.Screen name="SignUpBg" component={SignUpBg} />
    </StacK.Navigator>
  );
};

export default UserNavigation;
