/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export const GetRouteNameAdds = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('AddsScreen')) {
    return 'none';
  } else if (routeName?.includes('AddsScreenStack')) {
    return 'none';
  } else if (routeName?.includes('SelectScreenUp')) {
    return 'none';
  } else if (routeName?.includes('SelectBB')) {
    return 'none';
  }
  return 'flex';
};
