import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Color from '../../constants/color';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Color.primary500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    zIndex: 100,
  },
});

export default Loading;
