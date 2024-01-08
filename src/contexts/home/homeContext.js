/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';

export const HomeContext = createContext();

export const HomeProvider = props => {
  const {children} = props;

  const [posts, setPosts] = useState([]);
  return (
    <HomeContext.Provider value={{posts, setPosts}}>
      {children}
    </HomeContext.Provider>
  );
};
