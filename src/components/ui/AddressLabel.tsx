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
        SHADOWS.shadow4,
        {
          padding: 16,
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: isSelected ? Color.primary50 : Color.white,
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
