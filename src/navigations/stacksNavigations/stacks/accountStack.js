/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import AccountScreen from '../../../components/main/account';
import LoginScreen from '../../../components/user/login/Login';

const Stack = createNativeStackNavigator();

export function AccountStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AccountStackScreen" component={AccountScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
