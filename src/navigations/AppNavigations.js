/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../contexts/user/userContext';
import HomeNavigation from './stacksNavigations/homeNavigation';
import UserNavigation from './stacksNavigations/userNavigations';
import linking from '../utils/linking';

const AppNavigations = () => {
  const {user} = useContext(UserContext);
  return (
    <NavigationContainer linking={linking}>
      {user ? <HomeNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;
