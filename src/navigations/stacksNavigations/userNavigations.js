/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../components/user/login/Login';
import SingUpScreen from '../../components/user/signup/SingUp';

const StacK = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <StacK.Navigator screenOptions={{headerShown: false}}>
      <StacK.Screen name="LoginScreen" component={LoginScreen} />
      <StacK.Screen name="SingUpScreen" component={SingUpScreen} />
    </StacK.Navigator>
  );
};

export default UserNavigation;
