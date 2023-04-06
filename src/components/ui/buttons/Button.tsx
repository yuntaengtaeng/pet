import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import {
  neutral4,
  neutral5,
  primary100,
  primary200,
  primary600,
  primary800,
  primary900,
  white,
} from '../../../constants/color';
import TYPOS from '../typo';

type Type = 'primary' | 'secondary';

interface Props {
  label: string;
  buttonType: Type;
  width?: number;
  disabled?: boolean;
  onPressHandler?: () => void;
}

const Button = (props: Props) => {
  const { label, width, buttonType, disabled, onPressHandler } = props;

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        if (onPressHandler) {
          onPressHandler();
        }
      }}
      style={({ pressed }) => [
        styles.button,
        {
          width,
        },
        disabled
          ? styles.disabled
          : styles[`${buttonType}${pressed ? 'Pressed' : ''}`],
      ]}
    >
      <Text
        style={[
          TYPOS.medium,
          disabled ? styles.disabledLabel : styles[`${buttonType}Label`],
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: {
    color: white,
  },
  primary: {
    backgroundColor: primary600,
  },
  primaryPressed: {
    backgroundColor: primary800,
  },
  secondary: {
    backgroundColor: primary100,
  },
  secondaryPressed: {
    backgroundColor: primary200,
  },
  secondaryLabel: {
    color: primary900,
  },
  disabled: {
    backgroundColor: neutral5,
  },
  disabledLabel: {
    color: neutral4,
  },
});
