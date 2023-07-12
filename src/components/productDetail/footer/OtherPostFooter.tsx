import React from 'react';
import { View } from 'react-native';
import Color from '../../../constants/color';
import Button from '../../ui/buttons/Button';
import Favorite from '../../ui/icons/Favorite';

const OtherPostFooter = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        backgroundColor: Color.white,
        alignItems: 'center',
      }}
    >
      <Favorite size={32} />
      <View style={{ paddingLeft: 24 }} />
      <View style={{ flex: 1 }}>
        <Button label="채팅하기" />
      </View>
    </View>
  );
};

export default OtherPostFooter;
