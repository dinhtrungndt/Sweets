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

import SinhNhat from '../../../components/main/phonebook/Feature/SinhNhat';
import LoiMoiDaGui from '../../../components/main/phonebook/Feature/LoiMoiDaGui';
import QuetQR from '../../../components/main/phonebook/Feature/QuetQR';
import ScanQR from '../../../components/main/phonebook/Feature/ScanQR';
import BothRes from '../../../components/main/phonebook/TopTab/BothRes';
import ThoiTiet2 from '../../../components/main/phonebook/Feature/ThoiTiet2';
import OtherUserA from '../../../components/main/account/OtherUserAccounts/OtherUserA';
import Gift from '../../../components/main/phonebook/Feature/Gift/Gift';
import ReviewGift from '../../../components/main/phonebook/Feature/Gift/ReviewGift';
import ListSinhNhat from '../../../components/main/phonebook/Feature/Gift/ListSinhNhat';
import AcpectGift from '../../../components/main/phonebook/Feature/Gift/AcpectGift';
import TabBar1 from '../../../components/main/phonebook/Feature/Gift/ListHistoryNhan';
import ReviewSeen from '../../../components/main/phonebook/Feature/Gift/ReviewSeen';
import ReviewSeenHis from '../../../components/main/phonebook/Feature/Gift/ReviewSeenHis';
import AllFriend from '../../../components/main/phonebook/TopTab/AllFriend';
import {useNavigation} from '@react-navigation/native';
import OtherUserA2 from '../../../components/main/account/OtherUserAccounts/OtherUserA2';
const Stack = createNativeStackNavigator();

export function PhoneBookStack() {
 // const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhoneBookScreen" component={PhoneBookScreen}  />
      <Stack.Screen name="BothRes" component={BothRes} />
      <Stack.Screen name="AllFriend" component={AllFriend} />
      <Stack.Screen name="SinhNhat" component={SinhNhat} />
      <Stack.Screen name="LoiMoiKetBan" component={LoiMoiKetBan} />
      <Stack.Screen name="LoiMoiDaGui" component={LoiMoiDaGui} />
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="QuetQR" component={QuetQR} />
      <Stack.Screen name="QRCODE" component={QRCODE} />
      <Stack.Screen name="Gift" component={Gift} />
      <Stack.Screen name="ReviewGift" component={ReviewGift} />
      <Stack.Screen name="AcpectGift" component={AcpectGift} />
      <Stack.Screen name="ReviewSeenHis" component={ReviewSeenHis} />
      <Stack.Screen name="ReviewSeen" component={ReviewSeen} />
      <Stack.Screen name="ListSinhNhat" component={ListSinhNhat} />
      <Stack.Screen name="ThoiTiet" component={ThoiTiet} />
      <Stack.Screen name="ThoiTiet2" component={ThoiTiet2} />
      <Stack.Screen name="OtherUserA2" component={OtherUserA2} />
   
    </Stack.Navigator>
  );
}
