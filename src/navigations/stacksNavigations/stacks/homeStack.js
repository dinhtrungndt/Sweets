/* eslint-disable prettier/prettier */
import React from 'react';

// Screens
import HomeScreen from '../../../components/main/home';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import BottomSheetComponents from '../../../components/customs/bottomsheet';
import CommentsScreen from '../../../components/main/home/posts/comments';
import StoryScreen from '../../../components/main/home/story';
import PickStory from '../../../components/main/home/story/pickStory';

const Stack = createNativeStackNavigator();
export function Story() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PickStory" component={PickStory} />
    </Stack.Navigator>
  );
}
export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="BottomSheetComponents"
        component={BottomSheetComponents}
      />
      <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="StoryScreen" component={Story} />
    </Stack.Navigator>
  );
}
