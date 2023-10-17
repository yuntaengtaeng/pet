import { View, Image, Text, Pressable } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';
import { ProductInfo } from '../../../types/interface';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation';

const ProductInformation = ({
  id,
  title,
  price,
  image,
  status,
}: ProductInfo) => {
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        backgroundColor: Color.white,
      }}
      onPress={() => {
        navigation.navigate('ProductDetail', {
          id,
        });
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
        {image && (
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
        )}
        <View style={{ marginLeft: 16 }}>
          <Text style={[TYPOS.body3, { color: Color.neutral1 }]}>{title}</Text>
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
    </Pressable>
  );
};

export default ProductInformation;
