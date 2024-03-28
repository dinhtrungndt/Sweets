/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../components/user/login/Login';
import SingUpScreen from '../../components/user/signup/SingUp';

import BoardingScreens from '../../components/user/Boarding/Boarding';
import Update from '../../components/user/update/Update';

import HomeNavigation from './homeNavigation';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const StacK = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    // <<<<<<< HEAD
    //     <StacK.Navigator screenOptions={{ headerShown: false }}>
    //       <StacK.Screen name="BoardingScreens" component={BoardingScreens} />
    //       <StacK.Screen name="SingUpScreen" component={SingUpScreen} />
    //       <StacK.Screen name="LoginScreen" component={LoginScreen} />
    //       <StacK.Screen name="Update" component={Update} />
    //       <StacK.Screen name="Home" component={HomeNavigation} />
    //     </StacK.Navigator>
    // =======

    <StacK.Navigator screenOptions={{ headerShown: false }}>
      <StacK.Screen name="BoardingScreens" component={BoardingScreens} />
      <StacK.Screen name="SingUpScreen" component={SingUpScreen} />
      <StacK.Screen name="LoginScreen" component={LoginScreen} />
      <StacK.Screen name="Update" component={Update} />
      <StacK.Screen name="Home" component={HomeNavigation} />
    </StacK.Navigator>

    // >>>>>>> parent of 44adc45 (fix)
  );
};

export default UserNavigation;
