/* eslint-disable prettier/prettier */
import {Text, Image, View} from 'react-native';
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
    const label = route.name === 'HomeFriendTab' ? 'Bạn bè' : 'Thế giới';
    const opacity = focused ? 1 : 0.5;

    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {focused && (
            <View
              style={{
                width: 2,
                height: '80%',
                backgroundColor: '#000',
                marginHorizontal: 5,
              }}
            />
          )}
          <Text
            style={{
              color: focused ? '#000' : '#000',
              textAlign: 'center',
              opacity,
            }}>
            {label}
          </Text>
        </View>
      </View>
    );
  },
  tabBarIndicatorStyle: {
    height: 0,
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '44%',
    height: 45,
    padding: 0,
    alignSelf: 'center',
    borderColor: '#fff',
    marginBottom: 15,
    borderWidth: 0,
  },
});
