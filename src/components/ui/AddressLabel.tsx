import React from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';
import Close24 from './icons/Close24';

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
        <Close24 color={isSelected ? Color.primary700 : Color.black} />
      </Pressable>
    </Pressable>
  );
};

export default AddressLabel;
