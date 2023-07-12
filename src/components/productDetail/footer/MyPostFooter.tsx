import React from 'react';
import { View } from 'react-native';
import Button from '../../ui/buttons/Button';
import Color from '../../../constants/color';
import useModal from '../../../hooks/useModal';

const MyPostFooter = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        backgroundColor: Color.white,
      }}
    >
      <View style={{ flex: 1 }}>
        <Button label="상태변경" />
      </View>
      <View style={{ paddingLeft: 16 }} />
      <View style={{ flex: 1 }}>
        <Button label="대화중인 채팅방" buttonType="secondary" />
      </View>
    </View>
  );
};

export default MyPostFooter;
