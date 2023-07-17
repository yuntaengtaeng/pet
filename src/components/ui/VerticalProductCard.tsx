import React from 'react';
import { Image, Pressable, Text, ViewStyle } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';

interface Props {
  image: string;
  title: string;
  price: number;
  style?: ViewStyle;
  onPressHandler?: () => void;
}

const VerticalProductCard = (props: Props) => {
  return (
    <Pressable style={props.style} onPress={props.onPressHandler}>
      <Image
        style={[
          {
            width: 160,
            height: 160,
            resizeMode: 'cover',
            borderRadius: 8,
          },
        ]}
        source={{ uri: props.image }}
      />
      <Text style={[TYPOS.body1, { color: Color.black, marginBottom: 4 }]}>
        {props.title}
      </Text>
      <Text style={[TYPOS.headline4, { color: Color.black }]}>
        {props.price.toLocaleString()}원
      </Text>
    </Pressable>
  );
};

export default VerticalProductCard;
