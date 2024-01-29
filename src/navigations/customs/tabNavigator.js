/* eslint-disable prettier/prettier */
import {Text, Image, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// bottomTab
export const options = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    if (route.name === 'HomeStackScreen') {
      if (focused) {
        return <Ionicons name="home" size={23} color="#22b6c0" />;
      } else {
        return <Ionicons name="home-outline" size={23} color="#000" />;
      }
    } else if (route.name === 'ChatScreen') {
      if (focused) {
        return (
          <Ionicons name="chatbox-ellipses-sharp" size={23} color="#22b6c0" />
        );
      } else {
        return (
          <Ionicons name="chatbox-ellipses-outline" size={23} color="#000" />
        );
      }
    } else if (route.name === 'AddsScreen') {
      if (focused) {
        return <Octicons name="diff-added" size={23} color="#22b6c0" />;
      } else {
        return <Octicons name="diff-added" size={23} color="#000" />;
      }
    } else if (route.name === 'PhoneBookScreen') {
      if (focused) {
        return <FontAwesome name="address-book" size={22} color="#22b6c0" />;
      } else {
        return <FontAwesome name="address-book-o" size={22} color="#000" />;
      }
    } else if (route.name === 'AccountStackScreen') {
      if (focused) {
        return <Ionicons name="person-circle" size={25} color="#22b6c0" />;
      } else {
        return <Ionicons name="person-circle-outline" size={25} color="#000" />;
      }
    }
  },
  tabBarLabel: () => null,
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
