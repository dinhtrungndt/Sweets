/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export const GetRouteNameAccount = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('LoginScreen')) {
    return 'none';
  } else if (routeName?.includes('Profile')) {
    return 'none';
  } else if (routeName?.includes('AccountAndSecurity')) {
    return 'none';
  } else if (routeName?.includes('Account_Transfer')) {
    return 'none';
  } else if (routeName?.includes('SettingsAndPrivacy')) {
    return 'none';
  } else if (routeName?.includes('HelpAndSupport')) {
    return 'none';
  } else if (routeName?.includes('ScanQRLogin')) {
    return 'none';
  }
  return 'flex';
};
