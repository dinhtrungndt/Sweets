/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import React from 'react';
import UserNavigation from './src/navigations/stacksNavigations/userNavigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <UserProvider>
        <HomeProvider>
          <AppNavigations />
        </HomeProvider>
      </UserProvider>
      <Toast ref={ref => Toast.setRef(ref)} /> */}
      <UserNavigation />
    </SafeAreaView>
  );
};

export default App;
