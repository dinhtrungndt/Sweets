/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const StacK = createNativeStackNavigator();

import LoginScreens from './login/Login';
import SignUpBg from './signup/SignUpBg';
import SignUpScreens from './signup/SingUp';

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
