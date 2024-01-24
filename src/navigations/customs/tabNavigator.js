/* eslint-disable prettier/prettier */
import {Text, Image} from 'react-native';
import React from 'react';

// bottomTab
export const options = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    if (route.name === 'HomeStackScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/home_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/home_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'ChatScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/chat_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/chat_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'ReelsScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/icon_reels_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/icon_reels.png')}
          />
        );
      }
    } else if (route.name === 'PhoneBookScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/danhba_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/danhba_bottomTab.png')}
          />
        );
      }
    } else if (route.name === 'AccountScreen') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/account_bottomTab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/account_bottomTab.png')}
          />
        );
      }
    }
  },

  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'HomeStackScreen') {
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
    } else if (route.name === 'ReelsScreen') {
      return focused ? (
        <Text
          style={{
            color: '#095fe5',
          }}>
          Reels
        </Text>
      ) : (
        <Text> Reels </Text>
      );
    } else if (route.name === 'PhoneBookScreen') {
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
    } else if (route.name === 'AccountScreen') {
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
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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

// topTab
export const optionsTabsTop = ({route}) => ({
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'HomeFriendTab') {
      return focused ? (
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
          }}>
          Bạn bè
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Bạn bè
        </Text>
      );
    } else if (route.name === 'HomeWorldTab') {
      return focused ? (
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
          }}>
          Thế giới
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Thế giới
        </Text>
      );
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#616161',
    height: 3,
    width: '20%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#616161',
    alignSelf: 'center',
    position: 'absolute',
    left: '15%',
    top: '-8%',
  },
  tabBarStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: '50%',
    height: 45,
    padding: 0,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
