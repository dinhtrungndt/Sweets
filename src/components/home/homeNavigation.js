/* eslint-disable prettier/prettier */
import {Text, Image} from 'react-native';
import React from 'react';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import TrangChuScreen from './trangchu';
import ChatScreen from './chat';
import DanhBaScreen from './danhba';
import CaNhanScreen from './canhan';
import UpStatus from './trangchu/upload/upStatus';
import SelectScreenUp from './trangchu/upload/upStatus/select';
import SelectBB from './trangchu/upload/upStatus/select/selectBB';
import UpStory from './trangchu/upload/upStory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    if (route.name === 'HomeStack') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/home_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/home_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'ChatScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/chat_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/chat_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'DanhBaScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/danhba_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/danhba_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'CaNhanScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/account_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/account_bottomTab.png')}
          />
        );
      }
    }
  },

  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'HomeStack') {
      return focused ? (
        <Text
          style={{
            color: '#095fe5',
          }}>
          Trang chủ
        </Text>
      ) : (
        <Text> Trang chủ </Text>
      );
    } else if (route.name === 'ChatScreen') {
      return focused ? (
        <Text
          style={{
            color: '#095fe5',
          }}>
          Trò chuyện
        </Text>
      ) : (
        <Text> Trò chuyện </Text>
      );
    } else if (route.name === 'DanhBaScreen') {
      return focused ? (
        <Text
          style={{
            color: '#095fe5',
          }}>
          Danh bạ
        </Text>
      ) : (
        <Text> Danh bạ </Text>
      );
    } else if (route.name === 'CaNhanScreen') {
      return focused ? (
        <Text
          style={{
            color: '#095fe5',
          }}>
          Cá nhân
        </Text>
      ) : (
        <Text> Cá nhân </Text>
      );
    }
  },
  tabBarStyle: {
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    bottom: 10,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
});

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TrangChuScreen" component={TrangChuScreen} />
      <Stack.Screen name="UpStatus" component={UpStatus} />
      <Stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
      <Stack.Screen name="SelectBB" component={SelectBB} />
      <Stack.Screen name="UpStory" component={UpStory} />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="DanhBaScreen"
        component={DanhBaScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CaNhanScreen"
        component={CaNhanScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
