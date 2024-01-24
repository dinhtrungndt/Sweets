/* eslint-disable prettier/prettier */
import {View, Text, Image} from 'react-native';
import React from 'react';

export const LoadingScreen = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Image
        style={{width: 40, height: 40}}
        source={require('../../assets/loading.gif')}
      />
    </View>
  );
};
