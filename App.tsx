/* eslint-disable @typescript-eslint/no-unused-vars */
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import SelectScreenUp from './src/components/home/trangchu/upload/upStatus/select';
import Toast from 'react-native-toast-message';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import TrangChuScreen from './src/components/home/trangchu';
import UpStatus from './src/components/home/trangchu/upload/upStatus';
import UpStory from './src/components/home/trangchu/upload/upStory';
import SelectBB from './src/components/home/trangchu/upload/upStatus/select/selectBB';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TrangChuScreen" component={TrangChuScreen} />
          <Stack.Screen name="UpStatus" component={UpStatus} />
          <Stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
          <Stack.Screen name="UpStory" component={UpStory} />
          <Stack.Screen name="SelectBB" component={SelectBB} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
