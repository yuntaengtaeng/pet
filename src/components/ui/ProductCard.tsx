import React from 'react';
import { Pressable, Image, View, Text } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';
import Favorite16 from './icons/Favorite16';
import Chat16 from './icons/Chat16';
import { Product } from '../../types/interface';

interface Props extends Product {
  onPressHandler?: () => void;
}

const ProductCard = (props: Props) => {
  return (
    <Pressable
      onPress={props.onPressHandler}
      style={{
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Color.neutral4,
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image
          style={[
            {
              width: 96,
              height: 96,
              resizeMode: 'cover',
              borderRadius: 8,
            },
          ]}
          source={{ uri: props.image }}
        />
        {props.salesStatus === '예약중' && (
          <>
            <View
              style={{
                width: 96,
                height: 96,
                backgroundColor: 'rgba(0, 0, 0, 0.32)',
                position: 'absolute',
                left: 0,
                top: 0,
                borderRadius: 8,
              }}
            ></View>
            <View
              style={{
                position: 'absolute',
                width: 64,
                height: 64,
                left: 16,
                top: 16,
                backgroundColor: Color.primary100,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={[TYPOS.headline4, { color: Color.primary900 }]}>
                예약중
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={[TYPOS.headline4, { marginBottom: 4 }]}>
          {props.title}
        </Text>
        <Text
          style={[TYPOS.body3, { marginBottom: 4 }]}
        >{`${props.address} · ${props.timeDelta}`}</Text>
        <Text style={[TYPOS.headline4, { color: Color.primary900 }]}>
          {props.price}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row' }}>
            <Favorite16 color={Color.neutral3} style={{ marginRight: 4 }} />
            <Text style={[TYPOS.body3, { color: Color.neutral3 }]}>
              {props.likeCount}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <Chat16 color={Color.neutral3} style={{ marginRight: 4 }} />
            <Text style={[TYPOS.body3, { color: Color.neutral3 }]}>
              {props.chatCount}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;
