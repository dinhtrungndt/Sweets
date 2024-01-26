/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import {HomeFriendTab} from './homeFriend';
import {HomeWorldTab} from './homeWorld';

// custom
import {optionsTabsTop} from '../../../../navigations/customs/tabNavigator';

const TabTop = createMaterialTopTabNavigator();

const HomeTabsTop = () => {
  return (
    <View style={styles.T}>
      <TabTop.Navigator
        screenOptions={optionsTabsTop}
        initialRouteName="HomeWorldTab">
        <TabTop.Screen name="HomeFriendTab" component={HomeFriendTab} />
        <TabTop.Screen name="HomeWorldTab" component={HomeWorldTab} />
      </TabTop.Navigator>
    </View>
  );
};

export default HomeTabsTop;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
  },
});
