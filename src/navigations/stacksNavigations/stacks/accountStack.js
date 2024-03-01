/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import AccountScreen from '../../../components/main/account';
import LoginScreen from '../../../components/user/login/Login';
import Account_Transfer from '../../../components/main/account/account_transfer/Account_Transfer';

const Stack = createNativeStackNavigator();

export function AccountStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AccountStackScr" component={AccountScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Account_Transfer" component={Account_Transfer} />
    </Stack.Navigator>
  );
}
