/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import AllFeeling from './all';
import LikeFeeling from './like';
import LoveFeeling from './love';
import HahaFeeling from './haha';
import WowFeeling from './wow';

// custom
import {optionsTabsTop} from '../../../styles/optionsTabsTop';
import BuonFeeling from './buon';
import TucGianFeeling from './tucGian';

const TabTop = createMaterialTopTabNavigator();

const FeelingTop = ({reactions}) => {
  return (
    <View style={styles.T}>
      <TabTop.Navigator
        screenOptions={optionsTabsTop}
        initialParams={{reactions}}
        initialRouteName="AllFeeling">
        <TabTop.Screen
          name="AllFeeling"
          component={AllFeeling}
          initialParams={{reactions}}
        />
        <TabTop.Screen
          name="LikeFeeling"
          component={LikeFeeling}
          initialParams={{reactions}}
        />
        <TabTop.Screen
          name="LoveFeeling"
          component={LoveFeeling}
          initialParams={{reactions}}
        />
        <TabTop.Screen
          name="HahaFeeling"
          component={HahaFeeling}
          initialParams={{reactions}}
        />
        <TabTop.Screen
          name="WowFeeling"
          component={WowFeeling}
          initialParams={{reactions}}
        />
        <TabTop.Screen
          name="BuonFeeling"
          component={BuonFeeling}
          initialParams={{reactions}}
        />
        <TabTop.Screen
          name="TucGianFeeling"
          component={TucGianFeeling}
          initialParams={{reactions}}
        />
      </TabTop.Navigator>
    </View>
  );
};

export default FeelingTop;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
  },
});
