/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../user/userContext';
import UserNavigation from '../user/userNavigations';
import HomeNavigation from '../home/homeNavigation';

const AppNavigations = () => {
  const {user} = useContext(UserContext);
  return (
    <NavigationContainer>
      {user ? <HomeNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;
