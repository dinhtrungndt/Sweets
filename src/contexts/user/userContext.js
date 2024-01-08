/* eslint-disable prettier/prettier */
import React, {useState, useEffect, createContext} from 'react';
import {login} from '../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = props => {
  const {children} = props;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userPassword = await AsyncStorage.getItem('userPassword');
        if (userEmail && userPassword) {
          const result = await login(userEmail, userPassword);
          if (result && result.status === 1) {
            setUser(result);
          }
        }
      } catch (error) {
        console.log('Lỗi khi kiểm tra thông tin đăng nhập:', error);
      }
    };
    checkLogin();
  }, []);

  const onLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      console.log('Kết quả đăng nhập', result);
      if (result.status === 1 && result.token) {
        setUser(result);
        return true;
      }
    } catch (error) {
      console.log('Lỗi khi đăng nhập', error);
    }
    console.log('Lỗi khi đăng nhập', 'Thất bại');
    return false;
  };

  return (
    <UserContext.Provider value={{user, setUser, onLogin}}>
      {children}
    </UserContext.Provider>
  );
};
