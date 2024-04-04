/* eslint-disable prettier/prettier */
import React, {useState, useEffect, createContext} from 'react';
import {login} from '../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onUserLogout, onUserLogin} from '../../components/call/HomeTest';
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
            // await onUserLogout();
            // console.log('onUserLogout được gọi trước khi gọi onUserLogin');
            
            // await onUserLogin(result.id, result.user.name);
            console.log(
              'onUserLogin được gọi khi người dùng đăng nhập thành công',
            );
            console.log('23 User:', result.id);
            console.log('24 User:', result.user.name);
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
      // await onUserLogout();
      // console.log('onUserLogout được gọi thành công');
      setUser(null);
    } catch (error) {
      console.log('---- >>>>>>Lỗi khi đăng xuất:', error);
    }
  };

  // const getUserFriends = async () => {
  //   console.log('Bắt đầu hàm getUserFriends');
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     console.log('users:', user);
  //     console.log('user._id:', user._id);

  //     if (token && user && user._id) {
  //       const response = await AxiosInstance().get(`/users/get-users/${user._id}`);

  //       console.log('API response:', response);

  //       if (response && response.status === 1) {
  //         // Cập nhật thông tin bạn bè vào context
  //         setUser({ ...user, friends: response.friends });
  //         return response.friends;
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi lấy danh sách bạn bè:', error);
  //   }
  //   return [];
  // };

  const onLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      if (result.status === 1 && result.token) {
        const userId = result.user._id;

        // Lưu _id vào AsyncStorage
        await AsyncStorage.setItem('userId', userId);

        console.log(userId);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.setItem('token', result.token);
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
        setUser(result);
        await onUserLogin(result.id, result.user.name);
        console.log('User:', result.id);
        console.log('User:', result.user.name);
        if (result.user.friends) {
          console.log('Friends:', result.user.friends);
          await AsyncStorage.setItem(
            'friends',
            JSON.stringify(result.user.friends),
          );
        } else {
          console.log('No friends information available');
        }
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
