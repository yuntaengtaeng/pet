import React from 'react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';
import Button from '../ui/buttons/Button';

const EmptyList = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Text style={[{ color: Color.neutral2 }, TYPOS.headline2]}>
          아직 등록된 상품이 없어요.
        </Text>
        <Text style={[{ color: Color.neutral2 }, TYPOS.body1]}>
          상품을 등록하고 중고거래를 시작해보세요!
        </Text>
      </View>
      <View style={{ marginBottom: 24 }}>
        <Button label="상품 등록하기" />
      </View>
    </View>
  );
};

export default EmptyList;
