import { View, Image, Text } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';

interface Props {
  id: string;
  name: string;
  price: string;
  image?: string;
  status: '판매중' | '예약중' | '판매완료' | '삭제됨';
}

const ProductInformation = ({ id, name, price, image, status }: Props) => {
  const priceColor = status === '삭제됨' ? Color.neutral3 : Color.black;
  const statusColor = (() => {
    switch (status) {
      case '판매중':
        return Color.success;
      case '예약중':
        return Color.warning;
      case '판매완료':
        return Color.neutral2;
      case '삭제됨':
        return Color.neutral3;
    }
  })();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        backgroundColor: Color.white,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: Color.neutral4,
          paddingVertical: 8,
          borderBottomWidth: 1,
        }}
      >
        <Image
          style={[
            {
              width: 56,
              height: 56,
              resizeMode: 'cover',
              borderRadius: 5,
            },
          ]}
          source={{
            uri: image,
          }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text style={[TYPOS.body3, { color: Color.neutral1 }]}>{name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              style={[TYPOS.headline4, { color: priceColor, marginRight: 4 }]}
            >
              {price}
            </Text>
            <Text style={[TYPOS.headline4, { color: statusColor }]}>
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductInformation;
