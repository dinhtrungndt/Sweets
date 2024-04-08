/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export const GetRouteNamePhone = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('BothRes')) {
    return 'none';
  }
  if (routeName?.includes('ThoiTiet2')) {
    return 'none';
  }
  return 'flex';
};
