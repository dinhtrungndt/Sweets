/* eslint-disable prettier/prettier */
import React from 'react';

// Screens
import HomeScreen from '../../../components/main/home';

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
    </Stack.Navigator>
  );
}
