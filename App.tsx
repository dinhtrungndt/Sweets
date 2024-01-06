/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import React from 'react';
import {UserProvider} from './src/components/user/userContext';
import {HomeProvider} from './src/components/home/homeContext';
import AppNavigations from './src/components/navigations/AppNavigations';
import ChatScreen from './src/components/home/chat/ChatScreen';
import Test from './src/components/home/chat/test';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
<ChatScreen/>
    </SafeAreaView>
  );
};

export default App;
