/* eslint-disable prettier/prettier */
import React, { forwardRef, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native';
import { UserProvider } from './src/contexts/user/userContext';
import { HomeProvider } from './src/contexts/home/homeContext';
import AppNavigations from './src/navigations/AppNavigations';
import {LogBox} from 'react-native';
import ChatScreen from './src/components/main/chat';
// import {NavigationContainer} from '@react-navigation/native';
import { ChatScreenStack } from './src/navigations/stacksNavigations/stacks/chatStack';
import VideoCallPage from './src/components/call/VideoCAll';
import StackTest from './src/components/call/StackTest';
// import {MyProvider} from './src/components/call/UseContextTemp';

import Toast from 'react-native-toast-message';

const App = () => {
  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
