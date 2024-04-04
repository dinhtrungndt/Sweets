import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTest from './HomeTest';
import VideoCallPage from './VideoCAll';
import CallInvite from './CallInvite';
import {NavigationContainer} from '@react-navigation/native';
import {MyProvider} from './UseContextTemp';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator();
export default function StackTest() {
  return (
    <MyProvider>
      <NavigationContainer>
        <ZegoCallInvitationDialog />
        <Stack.Navigator>
          <Stack.Screen name="HomeTest" component={HomeTest} />
          <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
          <Stack.Screen name="CallInvite" component={CallInvite} />
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
      </NavigationContainer>
    </MyProvider>
  );
}
