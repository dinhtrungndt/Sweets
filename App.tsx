/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/contexts/user/userContext';
import {HomeProvider} from './src/contexts/home/homeContext';
import AppNavigations from './src/navigations/AppNavigations';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

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
