import React from 'react';

import DismissKeyboardView from './DismissKeyboardView';
import { ViewStyle } from 'react-native';

interface Props {
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Container = (props: Props) => {
  return (
    <DismissKeyboardView style={props.style}>
      {props.children}
    </DismissKeyboardView>
  );
};

export default Container;
