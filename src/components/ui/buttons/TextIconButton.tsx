import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../typo';
import Right16 from '../icons/Right16';

type Type = 'primary' | 'secondary';

export interface Props {
  label: string;
  buttonType?: Type;
  width?: number;
  disabled?: boolean;
  onPressHandler?: () => void;
  style?: ViewStyle;
}

const TextIconButton = (props: Props) => {
  const {
    label,
    width,
    buttonType = 'primary',
    disabled,
    onPressHandler,
    style,
  } = props;

  const color = (() => {
    if (disabled) {
      return Color.neutral3;
    }

    if (buttonType === 'primary') {
      return Color.primary900;
    } else {
      return Color.neutral2;
    }
  })();

  const backgroundColor = (pressed: boolean) => {
    if (disabled) {
      if (buttonType === 'primary') {
        return Color.neutral4;
      } else {
        return Color.white;
      }
    } else if (pressed) {
      return Color.primary50;
    } else {
      return 'transparent';
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (onPressHandler) {
          onPressHandler();
        }
      }}
      style={({ pressed }) => [
        {
          backgroundColor: backgroundColor(pressed),
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          paddingHorizontal: 8,
          flexDirection: 'row',
        },
        {
          width,
        },
      ]}
    >
      <Text
        style={[
          TYPOS.small,
          {
            color,
          },
        ]}
      >
        {label}
      </Text>
      <Right16 color={color} />
    </Pressable>
  );
};

export default TextIconButton;
