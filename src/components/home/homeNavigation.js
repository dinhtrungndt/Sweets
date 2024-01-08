/* eslint-disable prettier/prettier */
import {Text, Image} from 'react-native';
import React from 'react';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ChatScreen from './chat/ChatScreen';
import DanhBaScreen from './danhba';
import CaNhanScreen from './canhan';
import {HomeStack} from './stacks';
import {options} from '../custom/tabNavigator';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="DanhBaScreen"
        component={DanhBaScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CaNhanScreen"
        component={CaNhanScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
