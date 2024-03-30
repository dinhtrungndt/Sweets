/* eslint-disable prettier/prettier */
import React, {forwardRef, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/contexts/user/userContext';
import {HomeProvider} from './src/contexts/home/homeContext';
import AppNavigations from './src/navigations/AppNavigations';
// import {NavigationContainer} from '@react-navigation/native';
// import {MyProvider} from './src/components/call/UseContextTemp';


import Toast from 'react-native-toast-message';

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
      {/* <StackTest /> */}
      <ToastComponent />
    </SafeAreaView>
  );
};

const ToastComponent = forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

export default App;
