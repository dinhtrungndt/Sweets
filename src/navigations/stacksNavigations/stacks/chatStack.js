/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import ChatScreen from '../../../components/main/chat';
import ChatScreenIn from '../../../components/main/chat/inChat';

const Stack = createNativeStackNavigator();

export function ChatScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatScreenHome" component={ChatScreen} />
      <Stack.Screen name="ChatScreenIn" component={ChatScreenIn} />
    </Stack.Navigator>
  );
}
