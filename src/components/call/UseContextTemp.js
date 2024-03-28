import React, { createContext, useContext, useState } from 'react';
// Tạo một Context mới
export const MyContext = createContext();
// Tạo một custom provider
export const MyProvider = ({ children }) => {
    const [name, setName] = useState('Initial Value');
    return (
      <MyContext.Provider value={{ name, setName }}>
        {children}
      </MyContext.Provider>
    );
  };