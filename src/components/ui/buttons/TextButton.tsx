import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import {
  neutral4,
  neutral5,
  primary100,
  primary200,
  primary50,
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

const TextButton = (props: Props) => {
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
          ? styles[`${buttonType}Disabled`]
          : styles[`${buttonType}${pressed ? 'Pressed' : ''}`],
      ]}
    >
      <Text
        style={[
          TYPOS.small,
          disabled ? styles.disabledLabel : styles[`${buttonType}Label`],
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    height: 32,
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
    backgroundColor: white,
  },
  secondaryPressed: {
    backgroundColor: primary50,
  },
  secondaryLabel: {
    color: primary900,
  },
  primaryDisabled: {
    backgroundColor: neutral5,
  },
  secondaryDisabled: {
    backgroundColor: white,
  },
  disabledLabel: {
    color: neutral4,
  },
});
