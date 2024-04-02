/* eslint-disable prettier/prettier */
import React from 'react';

// Screens
import PhoneBookScreen from '../../../components/main/phonebook';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens

import QRCODE from '../../../components/main/phonebook/Feature/QRCODE';
import LoiMoiKetBan from '../../../components/main/phonebook/Feature/LoiMoiKetBan';
import ThoiTiet from '../../../components/main/phonebook/Feature/ThoiTiet';
import Profile from '../../../components/main/account/Profile/Profile';
import SinhNhat from '../../../components/main/phonebook/Feature/SinhNhat';
import LoiMoiDaGui from '../../../components/main/phonebook/Feature/LoiMoiDaGui';
import QuetQR from '../../../components/main/phonebook/Feature/QuetQR';
import ScanQR from '../../../components/main/phonebook/Feature/ScanQR';
import {useNavigation} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

export function PhoneBookStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhoneBookScreen" component={PhoneBookScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SinhNhat" component={SinhNhat} />
      <Stack.Screen name="LoiMoiKetBan" component={LoiMoiKetBan} />
      <Stack.Screen name="LoiMoiDaGui" component={LoiMoiDaGui} />
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="QuetQR" component={QuetQR} />
      <Stack.Screen name="QRCODE" component={QRCODE} />
      <Stack.Screen name="ThoiTiet" component={ThoiTiet} />
    </Stack.Navigator>
  );
}
