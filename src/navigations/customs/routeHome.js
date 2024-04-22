/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export const GetRouteNameHome = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('CommentsScreen')) {
    return 'none';
  } else if (routeName?.includes('StoryScreen')) {
    return 'none';
  } else if (routeName?.includes('PickStory')) {
    return 'none';
  } else if (routeName?.includes('SelectFeeingStory')) {
    return 'none';
  } else if (routeName?.includes('SettingStoryObjects')) {
    return 'none';
  } else if (routeName?.includes('ChangeObjects')) {
    return 'none';
  } else if (routeName?.includes('ScanQRLogin')) {
    return 'none';
  } else if (routeName?.includes('LiveStreamScreen')) {
    return 'none';
  } else if (routeName?.includes('LiveStreamHost')) {
    return 'none';
  } else if (routeName?.includes('SearchPosts')) {
    return 'none';
  } else if (routeName?.includes('AllTopTabSearch')) {
    return 'none';
  } else if (routeName?.includes('OtherUserA')) {
    return 'none';
  } else if (routeName?.includes('Profile')) {
    return 'none';
  } else if (routeName?.includes('NotificationsScreen')) {
    return 'none';
  } else if (routeName?.includes('ChatScreenIn')) {
    return 'none';
  } else if (routeName?.includes('VideoCallPage')) {
    return 'none';
  } else if (routeName?.includes('ZegoUIKitPrebuiltCallWaitingScreen')) {
    return 'none';
  } else if (routeName?.includes('ZegoUIKitPrebuiltCallInCallScreen')) {
    return 'none';
  }
  return 'flex';
};
