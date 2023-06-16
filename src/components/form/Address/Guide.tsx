import React from 'react';
import { View, Text } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';

interface Props {
  topText: string;
  bottomText: string;
}

const Guide = ({ topText, bottomText }: Props) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 72 }}>
      <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>{topText}</Text>
      <Text style={(TYPOS.body1, { color: Color.neutral2 })}>{bottomText}</Text>
    </View>
  );
};

export default Guide;
