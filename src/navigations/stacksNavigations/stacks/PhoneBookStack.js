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
const Stack = createNativeStackNavigator();

export function PhoneBookStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhoneBookScreen" component={PhoneBookScreen} />
      <Stack.Screen
        name="LoiMoiKetBan"
        component={LoiMoiKetBan}
      />
       <Stack.Screen
        name="QRCODE"
        component={QRCODE}
      />
       <Stack.Screen
        name="ThoiTiet"
        component={ThoiTiet}
      />
   
    </Stack.Navigator>
  );
}