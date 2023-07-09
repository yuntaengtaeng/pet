import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../typo';

const ToastMessage = ({ message }: { message: string }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={[TYPOS.body2, { color: Color.white }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    justifyContent: 'center',
    backgroundColor: Color.black,
    height: 48,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 88,
    left: 8,
    right: 8,
    zIndex: 999,
  },
});

export default ToastMessage;
