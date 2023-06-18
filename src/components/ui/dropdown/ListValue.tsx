import React from 'react';
import { Pressable, Text } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../typo';

interface Props {
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  onClickHandler?: (label: string) => void;
}

const ListValue = ({ label, isActive, disabled, onClickHandler }: Props) => {
  const getTextColor = () => {
    if (disabled) {
      return Color.neutral4;
    } else if (isActive) {
      return Color.primary700;
    } else {
      return Color.black;
    }
  };

  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      disabled={disabled}
      onPress={() => {
        if (onClickHandler) {
          onClickHandler(label);
        }
      }}
    >
      <Text style={[{ color: getTextColor() }, TYPOS.body1]}>{label}</Text>
    </Pressable>
  );
};

export default ListValue;
