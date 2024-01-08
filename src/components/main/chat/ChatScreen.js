/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import ScreenChatAll from './ScreenChatAll';
import ScreenChatGroup from './ScreenChatGroup';
import ScreenChatStorage from './ScreenChatStorage';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabScreen = () => {
  return (
    <TopTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'black', // Màu chữ khi tab được chọn
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
        },
      })}>
      <TopTab.Screen
        name="ScreenChatAll"
        component={ScreenChatAll}
        options={{title: 'All chat'}}
      />
      <TopTab.Screen
        name="ScreenChatGroup"
        component={ScreenChatGroup}
        options={{title: 'Group chat'}}
      />
      <TopTab.Screen
        name="ScreenChatStorage"
        component={ScreenChatStorage}
        options={{title: 'Storage'}}
      />
    </TopTab.Navigator>
  );
};

const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'TopTabScreen') {
            iconName = focused ? 'chatbox-sharp' : 'chatbox-outline';
          } else if (route.name === 'Screen1') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === 'Screen2') {
            iconName = focused ? 'person-sharp' : 'person-sharp';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      })}>
      <BottomTab.Screen
        name="TopTabScreen"
        component={TopTabScreen}
        options={{title: 'Chat', headerShown: false}}
      />
      <BottomTab.Screen
        name="Screen1"
        component={Screen1}
        options={{title: 'CalL', headerShown: false}}
      />
      <BottomTab.Screen
        name="Screen2"
        component={Screen2}
        options={{title: 'Profile', headerShown: false}}
      />
    </BottomTab.Navigator>
  );
};

const ChatScreen = () => {
  return (
    // <NavigationContainer>
    //   <View style={styles.container}>
    //     <View style={styles.top1}>
    //       <Text style={styles.text}>Sweets</Text>
    //       <Image
    //         style={styles.searchIcon}
    //         source={require('../chat/imageChat/timkiem.png')}
    //       />
    //     </View>
    //     <BottomTabScreen />
    //   </View>
    // </NavigationContainer>
    <Text>Hi</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  top1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic',
  },
  searchIcon: {
    width: 26,
    height: 30,
  },
  topTabContainer: {
    margin: 8,
  },
});

export default ChatScreen;
