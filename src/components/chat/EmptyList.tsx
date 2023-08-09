import React from 'react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';

const EmptyList = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={[TYPOS.headline2, { color: Color.neutral1, marginBottom: 8 }]}
      >
        아직 시작된 채팅이 없어요.
      </Text>
      <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>
        주변 이웃분들과 대화를 시작해보세요!
      </Text>
    </View>
  );
};

export default EmptyList;
