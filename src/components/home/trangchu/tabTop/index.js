import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import QuanTamScreen from '../quantam';
import KhacScreen from '../khac';
import {NavigationContainer} from '@react-navigation/native';

const TabTop = createMaterialTopTabNavigator();

const options = ({route}) => ({
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'QuanTamScreen') {
      return focused ? (
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
          }}>
          Quan tâm
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Quan tâm
        </Text>
      );
    } else if (route.name === 'KhacScreen') {
      return focused ? (
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
          }}>
          Khác
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Khác
        </Text>
      );
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#000',
    height: 3,
  },
});

const HomeTabsTop = () => {
  return (
    <View style={styles.T}>
      <NavigationContainer>
        <TabTop.Navigator screenOptions={options}>
          <TabTop.Screen name="QuanTamScreen" component={QuanTamScreen} />
          <TabTop.Screen name="KhacScreen" component={KhacScreen} />
        </TabTop.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default HomeTabsTop;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
  },
});
