import React from 'react';
import { View, Text } from 'react-native';
import TYPOS from '../../ui/typo';
import Color from '../../../constants/color';

interface Props {
  timestamp: string;
}

const DateDisplay = ({ timestamp }: Props) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={[TYPOS.body3, { color: Color.neutral3 }]}>
        2023년 2월 18일
      </Text>
    </View>
  );
};

export default DateDisplay;
