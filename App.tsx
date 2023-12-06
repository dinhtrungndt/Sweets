import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import SelectScreenUp from './src/components/home/trangchu/upload/upStatus/select';

// bottomTab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import TrangChuScreen from './src/components/home/trangchu';
import UpStatus from './src/components/home/trangchu/upload/upStatus';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="TrangChuScreen" component={TrangChuScreen} />
        <stack.Screen name="UpStatus" component={UpStatus} />
        <stack.Screen name="SelectScreenUp" component={SelectScreenUp} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
