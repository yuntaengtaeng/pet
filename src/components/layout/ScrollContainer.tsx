import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Color from '../../constants/color';

interface Props {
  children?: React.ReactNode;
  style?: ViewStyle;
}

const ScrollContainer = ({ children, style }: Props) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, style]}
      extraScrollHeight={100}
      enableOnAndroid={true}
    >
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flexGrow: 1,
  },
});

export default ScrollContainer;
