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

const TextButton = (props: Props) => {
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
    color: Color.primary900,
  },
  primary: {
    backgroundColor: Color.white,
  },
  primaryPressed: {
    backgroundColor: Color.primary50,
  },
  secondary: {
    backgroundColor: Color.white,
  },
  secondaryPressed: {
    backgroundColor: Color.primary50,
  },
  secondaryLabel: {
    color: Color.neutral2,
  },
  primaryDisabled: {
    backgroundColor: Color.neutral5,
  },
  secondaryDisabled: {
    backgroundColor: Color.white,
  },
  disabledLabel: {
    color: Color.neutral4,
  },
});
