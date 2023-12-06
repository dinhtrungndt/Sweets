import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import TrangChuScreen from './trangchu';
import ChatScreen from './chat';
import DanhBaScreen from './danhba';
import CaNhanScreen from './canhan';
import HomeTabsTop from './trangchu/tabTop';
import UpStatus from './trangchu/upload/upStatus';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    if (route.name === 'TrangChuScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/image/home_bottomTab.png')}
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
          <Image source={require('../../../media/image/chat_bottomTab.png')} />
        );
      } else {
        return (
          <Image source={require('../../../media/image/chat_bottomTab.png')} />
        );
      }
    } else if (route.name === 'DanhBaScreen') {
      if (focused) {
        return (
          <Image
            source={require('../../../media/image/danhba_bottomTab.png')}
          />
        );
      } else {
        return (
          <Image
            source={require('../../../media/image/danhba_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'CaNhanScreen') {
      if (focused) {
        return (
          <Image
            source={require('../../../media/image/account_bottomTab.png')}
          />
        );
      } else {
        return (
          <Image
            source={require('../../../media/image/account_bottomTab.png')}
          />
        );
      }
    }
  },
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'TrangChuScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          Trang chủ
        </Text>
      ) : (
        <Text> Tin Tức </Text>
      );
    } else if (route.name === 'ChatScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          Chat
        </Text>
      ) : (
        <Text> Lịch học </Text>
      );
    } else if (route.name === 'DanhBaScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          Danh bạ
        </Text>
      ) : (
        <Text> Diễn đàn </Text>
      );
    } else if (route.name === 'CaNhanScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          Cá nhân
        </Text>
      ) : (
        <Text> Điểm </Text>
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
    borderColor: '#FF8E3C',
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TrangChuScreen" component={TrangChuScreen} />
      <Stack.Screen name="UpStatus" component={UpStatus} />
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

const styles = StyleSheet.create({});
