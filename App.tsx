/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import React from 'react';
import {UserProvider} from './src/components/user/userContext';
import {HomeProvider} from './src/components/home/homeContext';
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
