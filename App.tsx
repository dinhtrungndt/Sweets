/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import UserNavigation from './src/navigations/stacksNavigations/userNavigations';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/contexts/user/userContext';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Ẩn SplashScreen sau thời gian cần thiết
    }, 2000); // Thời gian hiển thị SplashScreen (đơn vị: milliseconds)
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <UserNavigation />
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;
