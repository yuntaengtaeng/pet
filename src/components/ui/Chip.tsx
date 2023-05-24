import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ColorValue,
  ViewStyle,
} from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';

interface Props {
  label: string;
  onPressHandler?: () => void;
  isActive?: boolean;
  style?: ViewStyle;
}

const Chip = (props: Props) => {
  const { label, onPressHandler, isActive = false, style } = props;

  return (
    <Pressable
      onPress={onPressHandler}
      style={[
        styles.wrap,
        {
          borderColor: isActive ? Color.white : Color.primary700,
          backgroundColor: isActive ? Color.primary700 : Color.white,
        },
        style,
      ]}
    >
      <Text
        style={[
          TYPOS.small,
          { color: isActive ? Color.white : Color.primary700 },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 24,
  },
  unActive: {},
  inActvie: {},
});
