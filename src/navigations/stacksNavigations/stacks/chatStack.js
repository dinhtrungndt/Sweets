/* eslint-disable prettier/prettier */
import React from 'react';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import ChatScreen from '../../../components/main/chat';
import ChatScreenIn from '../../../components/main/chat/inChat';
import SearchScreens from '../../../components/main/layout/search';
import User from '../../../components/main/layout/search/Src/User/User';
import VideoCallPage from '../../../components/call/VideoCAll';
import HomeTest from '../../../components/call/HomeTest';
import InputYourName from '../../../components/call/InputYourName';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import OtherUserA from '../../../components/main/account/OtherUserAccounts/OtherUserA';
import Profile from '../../../components/main/account/Profile/Profile';
import CommentsScreen from '../../../components/main/home/posts/comments';

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
      <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
      <Stack.Screen name="HomeTest" component={HomeTest} />
      <Stack.Screen name="OtherUserA" component={OtherUserA} />
      <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
}
