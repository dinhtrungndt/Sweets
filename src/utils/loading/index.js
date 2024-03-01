/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';

export const LoadingScreen = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <LottieView
      ref={animationRef}
      source={require('../../assets/loading.json')}
      style={{width: '100%', height: '100%'}}
    />
  );
};
