import React from 'react';
import { Pressable, View } from 'react-native';
import Color from '../../../constants/color';
import Button from '../../ui/buttons/Button';
import Favorite from '../../ui/icons/Favorite';
import FillFavorite from '../../ui/icons/FillFavorite';
import { ProductDetail } from '../../../types/interface';

type Props = Pick<ProductDetail, 'isLike'> & {
  onLikeChangeHandler: () => void;
};

const OtherPostFooter = ({ onLikeChangeHandler, isLike }: Props) => {
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
      <Pressable onPress={onLikeChangeHandler}>
        {isLike ? (
          <FillFavorite size={32} color={Color.primary900} />
        ) : (
          <Favorite size={32} color={Color.neutral1} />
        )}
      </Pressable>
      <View style={{ paddingLeft: 24 }} />
      <View style={{ flex: 1 }}>
        <Button label="채팅하기" />
      </View>
    </View>
  );
};

export default OtherPostFooter;
