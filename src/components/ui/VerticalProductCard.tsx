import React from 'react';
import { Image, Pressable, Text, View, ViewStyle } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';
import Image32 from './icons/Image32';

interface Props {
  image: string;
  title: string;
  price: string;
  style?: ViewStyle;
  onPressHandler?: () => void;
}

const VerticalProductCard = (props: Props) => {
  return (
    <Pressable
      style={[props.style, { width: 160 }]}
      onPress={props.onPressHandler}
    >
      {!!props.image ? (
        <Image
          style={[
            {
              width: 160,
              height: 160,
              resizeMode: 'cover',
              borderRadius: 8,
              marginBottom: 8,
            },
          ]}
          source={{ uri: props.image }}
        />
      ) : (
        <View
          style={{
            width: 160,
            height: 160,
            borderRadius: 8,
            marginBottom: 8,
            backgroundColor: Color.neutral5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image32 color={Color.neutral4} />
        </View>
      )}

      <Text
        style={[TYPOS.body1, { color: Color.black, marginBottom: 4 }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {props.title} 가나다라
      </Text>
      <Text style={[TYPOS.headline4, { color: Color.black }]}>
        {props.price}
      </Text>
    </Pressable>
  );
};

export default VerticalProductCard;
