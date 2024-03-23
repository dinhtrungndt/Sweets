import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTest from './HomeTest';
import VideoCallPage from './VideoCAll';
const Stack = createNativeStackNavigator();
export default function StackTest() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTest" component={HomeTest} />
      <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
    </Stack.Navigator>
  );
}
