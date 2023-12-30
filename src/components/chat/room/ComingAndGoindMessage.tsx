import React from 'react';
import { View, Text } from 'react-native';
import TYPOS from '../../ui/typo';
import Color from '../../../constants/color';

interface Props {
  contents: string;
}

const ComingAndGoingMessage = ({ contents }: Props) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={[TYPOS.body3, { color: Color.neutral3 }]}>{contents}</Text>
    </View>
  );
};

export default ComingAndGoingMessage;
