/* eslint-disable prettier/prettier */
import React from 'react';

// Screens
import TrangChuScreen from '../trangchu';
import UpStatus from '../trangchu/upload/upStatus';
import SelectScreenUp from '../trangchu/upload/upStatus/select';
import SelectBB from '../trangchu/upload/upStatus/select/selectBB';
import UpStory from '../trangchu/upload/upStory';
import DropDown from '../trangchu/dropDown';
import HeaderScreens from '../layout/header';
import SearchScreens from '../layout/search';
import BottomSheet from '../layout/bottomSheet';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TrangChuScreen" component={TrangChuScreen} />
      <Stack.Screen name="UpStatus" component={UpStatus} />
      <Stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
      <Stack.Screen name="SelectBB" component={SelectBB} />
      <Stack.Screen name="UpStory" component={UpStory} />
      <Stack.Screen name="DropDown" component={DropDown} />
      <Stack.Screen name="HeaderScreens" component={HeaderScreens} />
      <Stack.Screen name="SearchScreens" component={SearchScreens} />
      <Stack.Screen name="BottomSheet" component={BottomSheet} />
    </Stack.Navigator>
  );
}
