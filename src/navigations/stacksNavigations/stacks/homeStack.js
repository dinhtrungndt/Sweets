/* eslint-disable prettier/prettier */
import React from 'react';

// Screens
import HomeScreen from '../../../components/main/home';
import UpStatus from '../../../components/main/home/upload/upStatus';
import SelectScreenUp from '../../../components/main/home/upload/upStatus/select';
import SelectBB from '../../../components/main/home/upload/upStatus/select/selectBB';
import UpStory from '../../../components/main/home/upload/upStory';
import DropDown from '../../../components/main/home/dropDown';
import HeaderScreens from '../../../components/main/layout/header';
import SearchScreens from '../../../components/main/layout/search';
import BottomSheetLayout from '../../../components/main/layout/bottomSheet';
import CommentScreen from '../../../components/main/home/comment';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UpStatus" component={UpStatus} />
      <Stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
      <Stack.Screen name="SelectBB" component={SelectBB} />
      <Stack.Screen name="UpStory" component={UpStory} />
      <Stack.Screen name="DropDown" component={DropDown} />
      <Stack.Screen name="HeaderScreens" component={HeaderScreens} />
      <Stack.Screen name="SearchScreens" component={SearchScreens} />
      <Stack.Screen name="BottomSheetLayout" component={BottomSheetLayout} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
    </Stack.Navigator>
  );
}
