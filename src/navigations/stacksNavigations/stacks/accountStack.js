/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import AccountScreen from '../../../components/main/account';
import LoginScreen from '../../../components/user/login/Login';
import Account_Transfer from '../../../components/main/account/account_transfer/Account_Transfer';
import Profile from '../../../components/main/account/Profile/Profile';
import EditProfile from '../../../components/main/account/EditProfile/EditProfile';
import AccountAndSecurity from '../../../components/main/account/PIM/AccountAndSecurity';
import SettingsAndPrivacy from '../../../components/main/account/PIM/SettingsAndPrivacy';
import HelpAndSupport from '../../../components/main/account/PIM/HelpAndSupport';
<<<<<<< HEAD
import ChangePassword from '../../../components/main/account/PIM/ChangePassword';
import ScanQRLogin from '../../../components/main/phonebook/Feature/ScanQRLogin';
import SavePostsScreen from '../../../components/main/account/savePosts';
import MyQRcode from '../../../components/main/account/PIM/MyQRcode';
=======
import OtherUserA from '../../../components/main/account/OtherUserAccounts/OtherUserA';
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf

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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AccountAndSecurity" component={AccountAndSecurity} />
      <Stack.Screen name="SettingsAndPrivacy" component={SettingsAndPrivacy} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
<<<<<<< HEAD
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ScanQRLogin" component={ScanQRLogin} />
      <Stack.Screen name="SavePostsScreen" component={SavePostsScreen} />
      <Stack.Screen name="MyQRcode" component={MyQRcode} />
=======
      <Stack.Screen name="OtherUserA" component={OtherUserA} />
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
    </Stack.Navigator>
  );
}
