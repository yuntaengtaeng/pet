import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

interface Props {
  type: 'DOG' | 'CAT';
  isSelected?: boolean;
  onPressHandler?: () => void;
  cardStyle?: ViewStyle;
}

const PetCard = ({ type, isSelected, onPressHandler, cardStyle }: Props) => {
  return (
    <Pressable
      style={[
        {
          borderWidth: 1,
          borderColor: Color.neutral4,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          ...(isSelected && {
            borderColor: Color.primary600,
          }),
        },
        cardStyle,
      ]}
      onPress={onPressHandler}
    >
      <Text style={TYPOS.headline1}>{type === 'DOG' ? '🐶' : '😺'}</Text>
      <Text style={[TYPOS.body1, { color: Color.black }]}>
        {type === 'DOG' ? '강아지' : '고양이'}
      </Text>
    </Pressable>
  );
};

export default PetCard;
