/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export const GetRouteNameChat = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('SearchScreens')) {
    return 'none';
  } else if (routeName?.includes('ChatScreenIn')) {
    return 'none';
  } else if (routeName?.includes('VideoCallPage')) {
    return 'none';
  } else if (routeName?.includes('HomeTest')) {
    return 'none';
  } else if (routeName?.includes('ZegoUIKitPrebuiltCallWaitingScreen')) {
    return 'none';
  } else if (routeName?.includes('ZegoUIKitPrebuiltCallInCallScreen')) {
    return 'none';
  }
  return 'flex';
};
