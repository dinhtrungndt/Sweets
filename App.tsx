import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';

import LoginScreens from './src/components/user/login/Login';
import SignUpScreens from './src/components/user/signup/SingUp';

const App = () => {
  return (
    <SafeAreaView>
      {/* <LoginScreens /> */}
      <SignUpScreens />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
