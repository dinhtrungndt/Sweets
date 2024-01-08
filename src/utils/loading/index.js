/* eslint-disable prettier/prettier */
import {View, Text, Image} from 'react-native';
import React from 'react';

export const LoadingScreen = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: 50,
      }}>
      <Image
        style={{width: 50, height: 50}}
        source={require('../../assets/loading.gif')}
      />
    </View>
  );
};
