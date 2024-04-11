/* eslint-disable prettier/prettier */
import React from 'react';

// Screens
import HomeScreen from '../../../components/main/home';

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import BottomSheetComponents from '../../../components/customs/bottomsheet';
import CommentsScreen from '../../../components/main/home/posts/comments';
import StoryScreen from '../../../components/main/home/uploads/story';
import PickStory from '../../../components/main/home/uploads/story/pickStory';
import PostsScreen from '../../../components/main/home/posts';
import SelectFeeingStory from '../../../components/main/home/uploads/story/selectFeelingStory';
import SettingStoryObjects from '../../../utils/settingStoryObjects';
import OtherUserA from '../../../components/main/account/OtherUserAccounts/OtherUserA';
import Profile from '../../../components/main/account/Profile/Profile';
import ModalEditPostsAccount from '../../../components/main/home/posts/editPosts/account';
import SelectScreenUp from '../../../components/main/home/uploads/posts/select';
import ChangeObjects from '../../../components/main/home/posts/editPosts/account/objects';

import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import LiveStreamHost from '../../../components/main/home/liveStream/LiveStreamHost';
import LiveStreamScreen from '../../../components/main/home/liveStream';
const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="PostsScreen" component={PostsScreen} />
      <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="PickStory" component={PickStory} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
      <Stack.Screen name="SelectFeeingStory" component={SelectFeeingStory} />
      <Stack.Screen
        name="SettingStoryObjects"
        component={SettingStoryObjects}
      />
      <Stack.Screen name="OtherUserA" component={OtherUserA} />

      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
      <Stack.Screen name="ChangeObjects" component={ChangeObjects} />
      <Stack.Screen
        name="ModalEditPostsAccount"
        component={ModalEditPostsAccount}
      />
      <Stack.Screen name="LiveStreamScreen" component={LiveStreamScreen} />
      <Stack.Screen name="LiveStreamHost" component={LiveStreamHost} />

      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="ScanQRLogin" component={ScanQRLogin} /> */}
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
