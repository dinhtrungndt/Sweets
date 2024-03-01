/* eslint-disable prettier/prettier */
import React from 'react';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ChatScreen from '../../components/main/chat/ChatScreen';
import {options} from '../customs/tabNavigator';
import PhoneBookScreen from '../../components/main/phonebook';
import {HomeStackScreen} from './stacks/homeStack';
import AddsScreen from '../../components/main/home/uploads/posts';
import {AccountStackScreen} from './stacks/accountStack';
import {GetRouteNameAccount} from '../customs/routeAccount';
import {GetRouteNameHome} from '../customs/routeHome';
import { GetRouteNamePhone } from '../customs/routePhone';
import { PhoneBookStack } from './stacks/PhoneBookStack';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={({route}) => ({
          tabBarStyle: {display: GetRouteNameHome(route)},
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AddsScreen"
        component={AddsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="PhoneBookScreen"
        component={PhoneBookStack}
        options={({route}) => ({
          tabBarStyle: {display: GetRouteNamePhone(route)},
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="AccountStackScreen"
        component={AccountStackScreen}
        options={({route}) => ({
          tabBarStyle: {display: GetRouteNameAccount(route)},
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
