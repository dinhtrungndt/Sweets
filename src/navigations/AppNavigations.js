/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../contexts/user/userContext';
import HomeNavigation from './stacksNavigations/homeNavigation';
import UserNavigation from './stacksNavigations/userNavigations';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import linking from '../utils/linking';

const AppNavigations = () => {
  const {user} = useContext(UserContext);

  const AppNavigations = () => {
    const {user} = useContext(UserContext);
    return (
      <NavigationContainer linking={linking}>
        <ZegoCallInvitationDialog />
        {user ? <HomeNavigation /> : <UserNavigation />}
      </NavigationContainer>
    );
  };
};

export default AppNavigations;
