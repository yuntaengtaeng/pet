import React from 'react';
import { View, Text, Pressable } from 'react-native';
import SHADOWS from './shadow';
import TYPOS from './typo';
import Color from '../../constants/color';
import Close from './icons/Close';

interface Props {
  address: string;
  isSelected?: boolean;
  onClosePressHandler?: () => void;
}

const AddressLabel = ({ address, isSelected, onClosePressHandler }: Props) => {
  return (
    <View
      style={[
        SHADOWS.shadow4,
        {
          padding: 16,
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: isSelected ? Color.primary50 : Color.white,
        },
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
    </View>
  );
};

export default AddressLabel;
