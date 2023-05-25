import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../typo';

type Type = 'primary' | 'secondary';

interface Props {
  label: string;
  buttonType?: Type;
  width?: number;
  disabled?: boolean;
  onPressHandler?: () => void;
}

const Button = (props: Props) => {
  const {
    label,
    width,
    buttonType = 'primary',
    disabled,
    onPressHandler,
  } = props;

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
    color: Color.white,
  },
  primary: {
    backgroundColor: Color.primary600,
  },
  primaryPressed: {
    backgroundColor: Color.primary800,
  },
  secondary: {
    backgroundColor: Color.primary100,
  },
  secondaryPressed: {
    backgroundColor: Color.primary200,
  },
  secondaryLabel: {
    color: Color.primary900,
  },
  disabled: {
    backgroundColor: Color.neutral5,
  },
  disabledLabel: {
    color: Color.neutral4,
  },
});
