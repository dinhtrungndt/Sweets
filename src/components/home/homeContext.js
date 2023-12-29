import React, {createContext, useState} from 'react';

export const HomeContext = createContext();

export const HomeProvider = props => {
  const {children} = props;

  const [news, setNews] = useState([]);
  return (
    <HomeContext.Provider value={{news, setNews}}>
      {children}
    </HomeContext.Provider>
  );
};