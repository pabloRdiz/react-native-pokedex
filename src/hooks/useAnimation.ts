import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;
  const position = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0.4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startMoving = (initPosition: number = -100, duration: number = 300) => {
    position.setValue(initPosition);

    Animated.timing(position, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  return { opacity, position, fadeIn, fadeOut, startMoving };
};
