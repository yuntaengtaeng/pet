import React from 'react';
import { View, Text } from 'react-native';

import Favorite16 from '../ui/icons/Favorite16';
import Chat16 from '../ui/icons/Chat16';
import Eye16 from '../ui/icons/Eye16';

import Color from '../../constants/color';
import TYPOS from '../ui/typo';

import { ProductDetail } from '../../types/interface';

type Props = Pick<ProductDetail, 'likeCount' | 'viewCount' | 'chatCount'>;

const ProductStats = ({ likeCount, viewCount, chatCount }: Props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', marginRight: 8 }}>
        <Favorite16 color={Color.neutral2} style={{ marginRight: 4 }} />
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
          {likeCount}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginRight: 8 }}>
        <Chat16 color={Color.neutral2} style={{ marginRight: 4 }} />
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
          {chatCount}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Eye16 color={Color.neutral2} style={{ marginRight: 4 }} />
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
          {viewCount}
        </Text>
      </View>
    </View>
  );
};

export default ProductStats;
