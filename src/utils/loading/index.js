/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

export const LoadingScreen = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        ref={animationRef}
        source={require('../../assets/loading.json')}
        style={{
          width: '40%',
          height: '40%',
        }}
      />
    </View>
  );
};
