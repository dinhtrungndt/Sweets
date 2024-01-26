/* eslint-disable prettier/prettier */
import {Text, Image} from 'react-native';
import React from 'react';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ChatScreen from '../../components/main/chat/ChatScreen';
import {options} from '../customs/tabNavigator';
import PhoneBookScreen from '../../components/main/phonebook';
import AccountScreen from '../../components/main/account';
import {HomeStackScreen} from './stacks/homeStack';
import {ReelsScreen} from '../../components/main/reels';


const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ReelsScreen"
        component={ReelsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="PhoneBookScreen"
        component={PhoneBookScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
