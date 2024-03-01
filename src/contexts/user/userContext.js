/* eslint-disable prettier/prettier */
import React, {useState, useEffect, createContext} from 'react';
import {login} from '../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = props => {
  const {children} = props;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
      setUser(null);
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
    } 
    
  }

  const onUserInformation = async (name, avatar) => {
    try {
      const result = await AsyncStorage.setItem('name', name);
      const result1 = await AsyncStorage.setItem('avatar', avatar);
      if (result && result1) {
        return true;
      }
    } catch (error) {
      console.log('Lỗi khi lưu thông tin người dùng:', error);
    }
    return false;
  }

  const onLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      if (result.status === 1 && result.token) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.setItem('token', result.token);
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
        setUser(result);
        return true;
      }
    } catch (error) {
      console.log('Lỗi khi đăng nhập', error);
    }
    // console.log('Lỗi khi đăng nhập', 'Thất bại');
    return false;
  };

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{user, setUser, onLogin, onLogout}}>
      {children}
    </UserContext.Provider>
  );
};
