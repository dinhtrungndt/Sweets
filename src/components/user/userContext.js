import React, { useState, createContext } from 'react'
import { login } from './UserService';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);

  const onLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      console.log('Kết quả đăng nhập', result);
      if (result.status === 1) {
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
    <UserContext.Provider value={{
      user,
      setUser,
      onLogin
    }}>

      {children}
    </UserContext.Provider>
  )
}