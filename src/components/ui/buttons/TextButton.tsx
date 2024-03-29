import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../typo';

type Type = 'primary' | 'secondary';

export interface Props {
  label: string;
  buttonType?: Type;
  width?: number;
  disabled?: boolean;
  onPressHandler?: () => void;
  style?: ViewStyle;
}

const TextButton = (props: Props) => {
  const {
    label,
    width,
    buttonType = 'primary',
    disabled,
    onPressHandler,
    style,
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
        ,
        style,
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

export default TextButton;

const styles = StyleSheet.create({
  button: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
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
    backgroundColor: Color.neutral4,
  },
  secondaryDisabled: {
    backgroundColor: Color.white,
  },
  disabledLabel: {
    color: Color.neutral3,
  },
});
