/* eslint-disable prettier/prettier */
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../contexts/user/userContext';
import HomeNavigation from './stacksNavigations/homeNavigation';
import UserNavigation from './stacksNavigations/userNavigations';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {onUserLogin} from '../components/call/HomeTest';
import linking from '../utils/linking';

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
    <NavigationContainer linking={linking}>
      <ZegoCallInvitationDialog />
      {user ? <HomeNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;
