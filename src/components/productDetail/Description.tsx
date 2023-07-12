import React from 'react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';

import { ProductDetail } from '../../types/interface';

type Props = Pick<ProductDetail, 'description'>;

const Description = ({ description }: Props) => {
  return (
    <View>
      <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>
        {description}
      </Text>
    </View>
  );
};

export default Description;
