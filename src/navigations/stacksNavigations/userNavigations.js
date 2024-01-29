/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
<<<<<<< HEAD
import LoginScreens from '../../components/user/login/Login';
import SignUpScreens from '../../components/user/signup/SingUp';
import SignUpBg from '../../components/user/signup/SignUpBg';
import AccountScreen from '../../components/main/account/index';
=======
import LoginScreen from '../../components/user/login/Login';
import SingUpScreen from '../../components/user/signup/SingUp';
import {NavigationContainer} from '@react-navigation/native';
import BoardingScreens from '../../components/user/Boarding/Boarding';
import Update from '../../components/user/update/Update';
import HomeNavigation from './homeNavigation';
>>>>>>> main

const StacK = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <StacK.Navigator screenOptions={{headerShown: false}}>
<<<<<<< HEAD
      <StacK.Screen name="LoginScreens" component={LoginScreens} />
      <StacK.Screen name="SignUpScreens" component={SignUpScreens} />
      <StacK.Screen name="SignUpBg" component={SignUpBg} />
      <StacK.Screen name="AccountScreen" component={AccountScreen} />
=======
      <StacK.Screen name="BoardingScreens" component={BoardingScreens} />
      <StacK.Screen name="SingUpScreen" component={SingUpScreen} />
      <StacK.Screen name="LoginScreen" component={LoginScreen} />
      <StacK.Screen name="Update" component={Update} />
      <StacK.Screen name="Home" component={HomeNavigation} />
>>>>>>> main
    </StacK.Navigator>
  );
};

export default UserNavigation;
