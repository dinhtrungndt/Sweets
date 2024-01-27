/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../components/user/login/Login';
import SingUpScreen from '../../components/user/signup/SingUp';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../../components/user/Splash/SplashScreens';
import BoardingScreens from '../../components/user/Boarding/Boarding';
import Update from '../../components/user/update/Update';
import { HomeStackScreen } from './stacks/homeStack';
import HomeNavigation from './homeNavigation';

const StacK = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <NavigationContainer>
      <StacK.Navigator screenOptions={{ headerShown: false }}>
        <StacK.Screen name="BoardingScreens" component={BoardingScreens} />
        <StacK.Screen name="SingUpScreen" component={SingUpScreen} />
        <StacK.Screen name="LoginScreen" component={LoginScreen} />
        <StacK.Screen name="Update" component={Update} />
        <StacK.Screen name="Home" component={HomeNavigation} />
      
      </StacK.Navigator>
    </NavigationContainer>
  );
};

export default UserNavigation;
