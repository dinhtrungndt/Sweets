import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import LoginScreens from './src/components/user/login/Login';
import SignUpScreens from './src/components/user/signup/SingUp';
import { UserProvider } from './src/components/user/userContext';
import { HomeProvider } from './src/components/home/homeContext';
import AppNavigations from './src/components/navigations/AppNavigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <HomeProvider>
          <AppNavigations />
        </HomeProvider>
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
