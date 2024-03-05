/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import ChatScreen from '../../../components/main/chat';
import ChatScreenIn from '../../../components/main/chat/inChat';
import SearchScreens from '../../../components/main/layout/search';
import User from '../../../components/main/layout/search/Src/User/User';
const Stack = createNativeStackNavigator();

export function ChatScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatScreenHome" component={ChatScreen} />
      <Stack.Screen name="SearchScreens" component={User} />
      <Stack.Screen name="ChatScreenIn" component={ChatScreenIn} />
     

    </Stack.Navigator>
  );
}
