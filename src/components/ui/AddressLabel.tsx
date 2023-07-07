import React from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import SHADOWS from './shadow';
import TYPOS from './typo';
import Color from '../../constants/color';
import Close from './icons/Close';

interface Props {
  address: string;
  isSelected?: boolean;
  onClosePressHandler?: () => void;
  onPressHandler?: () => void;
  style?: ViewStyle;
}

const AddressLabel = ({
  address,
  isSelected,
  onClosePressHandler,
  onPressHandler,
  style,
}: Props) => {
  return (
    <Pressable
      onPress={onPressHandler}
      style={[
        {
          paddingVertical: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Text
        style={[
          TYPOS.body1,
          { color: isSelected ? Color.primary700 : Color.black },
        ]}
      >
        {address}
      </Text>
      <Pressable onPress={onClosePressHandler}>
        <Close size={24} color={isSelected ? Color.primary700 : Color.black} />
      </Pressable>
    </Pressable>
  );
};

export default AddressLabel;
