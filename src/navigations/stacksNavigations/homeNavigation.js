/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

// bottomTab
import { createBottomTabNavigator, DarkTheme } from '@react-navigation/bottom-tabs';

// Screens
import { options } from '../customs/tabNavigator';
import { HomeStackScreen } from './stacks/homeStack';
import { AccountStackScreen } from './stacks/accountStack';
import { GetRouteNameAccount } from '../customs/routeAccount';
import { GetRouteNameHome } from '../customs/routeHome';
import { GetRouteNamePhone } from '../customs/routePhone';
import { PhoneBookStack } from './stacks/PhoneBookStack';
import { ChatScreenStack } from './stacks/chatStack';
import { AddsScreenStack } from './stacks/addsStack';
import { GetRouteNameAdds } from '../customs/routeAdds';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { GetRouteNameChat } from '../customs/routeChat';

import { EventRegister } from 'react-native-event-listeners';
import theme from '../../themes/theme';
import themContext from '../../themes/themeContext';
import { DefaultTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('changeTheme', data => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  return (
    <themContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <Tab.Navigator
        screenOptions={options}
        them={darkMode === true ? DarkTheme : DefaultTheme}>
        <Tab.Screen
          name="HomeStackScreen"
          component={HomeStackScreen}
          options={({ route }) => ({
            tabBarStyle: { display: GetRouteNameHome(route) },
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="ChatScreen"
          component={ChatScreenStack}
          options={({ route }) => ({
            tabBarStyle: { display: GetRouteNameChat(route) },
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="AddsScreen"
          component={AddsScreenStack}
          options={({ route }) => ({
            tabBarStyle: { display: 'none' },
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="PhoneBookScreen"
          component={PhoneBookStack}
          options={({ route }) => ({
            tabBarStyle: { display: GetRouteNamePhone(route) },
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="AccountStackScreen"
          component={AccountStackScreen}
          options={({ route }) => ({
            tabBarStyle: { display: GetRouteNameAccount(route) },
            headerShown: false,
          })}
        />
      </Tab.Navigator>
    </themContext.Provider>
  );
};

export default HomeNavigation;
