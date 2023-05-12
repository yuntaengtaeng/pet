import React from 'react';
import { Pressable, Text, StyleSheet, View, ColorValue } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';

interface Props {
  label: string;
  onPressHanlder?: () => void;
  isActive?: boolean;
}

const Chip = (props: Props) => {
  const { label, onPressHanlder, isActive = false } = props;

  console.log(isActive ? Color.primary700 : Color.white);
  console.log(label);

  return (
    <Pressable
      onPress={onPressHanlder}
      style={[
        styles.wrap,
        {
          borderColor: isActive ? Color.white : Color.primary700,
          backgroundColor: isActive ? Color.primary700 : Color.white,
        },
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
