/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
<<<<<<< HEAD
=======
import {createNativeStackNavigator} from '@react-navigation/native-stack';
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf

// Screen
import {AddsScreen} from '../../../components/main/home/uploads/posts';
import SelectScreenUp from '../../../components/main/home/uploads/posts/select';
import SelectBB from '../../../components/main/home/uploads/posts/select/selectBB';
<<<<<<< HEAD
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabFriendUpLoad from '../../../components/main/home/uploads/posts/tags';
=======
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf

const Stack = createNativeStackNavigator();

export function AddsScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AddsScreenStack" component={AddsScreen} />
      <Stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
      <Stack.Screen name="SelectBB" component={SelectBB} />
      <Stack.Screen name="TabFriendUpLoad" component={TabFriendUpLoad} />
    </Stack.Navigator>
  );
}
