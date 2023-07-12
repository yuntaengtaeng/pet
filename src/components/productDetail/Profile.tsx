import React from 'react';
import { View, Text, Image } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';
import { ProductDetail } from '../../types/interface';

type Props = Pick<
  ProductDetail,
  'sellerNickname' | 'address' | 'sellerProfileImage'
>;

const Profile = ({ sellerNickname, sellerProfileImage, address }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
      }}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 40 }}
        source={
          sellerProfileImage
            ? { uri: sellerProfileImage }
            : require('../../../assets/img/placeholder.png')
        }
      />
      <View style={{ marginLeft: 8 }}>
        <Text
          style={[{ color: Color.black, marginBottom: 4 }, TYPOS.headline4]}
        >
          {sellerNickname}
        </Text>
        <Text style={[{ color: Color.neutral1 }, TYPOS.body3]}>{address}</Text>
      </View>
    </View>
  );
};

export default Profile;
