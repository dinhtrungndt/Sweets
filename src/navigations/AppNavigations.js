/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../contexts/user/userContext';
import HomeNavigation from './stacksNavigations/homeNavigation';
import UserNavigation from './stacksNavigations/userNavigations';

const AppNavigations = () => {
  const {user} = useContext(UserContext);
  return (
    <NavigationContainer>
      {user ? <HomeNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;
