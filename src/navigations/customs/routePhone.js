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
  if (routeName?.includes('ThoiTiet')) {
    return 'none';
  }
  if (routeName?.includes('ScanQR')) {
    return 'none';
  }
  if (routeName?.includes('SinhNhat')) {
    return 'none';
  }
  if (routeName?.includes('QuetQR')) {
    return 'none';
  }
  if (routeName?.includes('QRCODE')) {
    return 'none';
  }
  return 'flex';
};
