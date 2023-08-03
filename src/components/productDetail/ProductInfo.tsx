import React from 'react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';
import ArrowRight from '../ui/icons/ArrowRight';
import { ProductDetail } from '../../types/interface';

type Props = Pick<
  ProductDetail,
  'title' | 'subCategory' | 'timeDelta' | 'salesStatus' | 'price'
>;

const ProductInfo = ({
  title,
  subCategory,
  timeDelta,
  salesStatus,
  price,
}: Props) => {
  const salesStatusColor = (() => {
    if (salesStatus === '예약중') {
      return Color.warning;
    } else if (salesStatus === '거래완료') {
      return Color.neutral2;
    } else if (salesStatus === '판매중') {
      return Color.success;
    }
  })();

  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Text style={[TYPOS.small, { color: Color.neutral2 }]}>
          {subCategory}
        </Text>
        <ArrowRight size={16} color={Color.neutral2} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
          {title}
        </Text>
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
          {timeDelta}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[TYPOS.headline2, { color: Color.black }]}>{price}</Text>
        <Text style={[TYPOS.headline2, { color: salesStatusColor }]}>
          {salesStatus}
        </Text>
      </View>
    </View>
  );
};

export default ProductInfo;
