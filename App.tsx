/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import React from 'react';
// import Toast from 'react-native-toast-message';
// import {UserProvider} from './src/contexts/user/userContext';
// import {HomeProvider} from './src/contexts/home/homeContext';
// import AppNavigations from './src/navigations/AppNavigations';
import HomeScreen from './src/components/main/home';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <UserProvider>
        <HomeProvider>
          <AppNavigations />
        </HomeProvider>
      </UserProvider>
      <Toast ref={ref => Toast.setRef(ref)} /> */}
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
