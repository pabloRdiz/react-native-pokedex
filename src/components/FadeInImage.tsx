import React, { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useAnimation } from '../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} }: Props) => {
  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(false);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = () => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...(style as ViewStyle),
      }}>
      {isLoading && (
        <ActivityIndicator style={styles.indicator} color="grey" size={30} />
      )}
      <Animated.Image
        source={{ uri }}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as ImageStyle),
          opacity,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
  },
});
