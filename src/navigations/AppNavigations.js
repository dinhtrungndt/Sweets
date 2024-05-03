/* eslint-disable prettier/prettier */
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../contexts/user/userContext';
import HomeNavigation from './stacksNavigations/homeNavigation';
import UserNavigation from './stacksNavigations/userNavigations';
<<<<<<< HEAD
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {onUserLogin} from '../components/call/HomeTest';
import linking from '../utils/linking';
=======
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf

const AppNavigations = () => {
  const {user} = useContext(UserContext);
  useEffect(() => {
    const zegoLogin = async () => {
      console.log('>>>>>>>>>>>>> 200 user', user.id);
      if (user) {
        console.log('user khac null');
        await onUserLogin(user.id, user.user.name);
      }
    };
    zegoLogin();
  }, []);
  return (
<<<<<<< HEAD
    <NavigationContainer linking={linking}>
      <ZegoCallInvitationDialog />
=======
    <NavigationContainer>
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
      {user ? <HomeNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;
