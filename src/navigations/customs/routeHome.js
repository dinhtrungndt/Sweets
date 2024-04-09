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
  }
  return 'flex';
};
