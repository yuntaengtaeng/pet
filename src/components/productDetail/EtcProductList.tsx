import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import axios from 'axios';
import { EtcProduct } from '../../types/interface';
import VerticalProductCard from '../ui/VerticalProductCard';
import { StackNavigationProp } from '@react-navigation/stack';
import TYPOS from '../ui/typo';
import Color from '../../constants/color';
import Right16 from '../ui/icons/Right16';

interface Props {
  boardId: string;
  sellerNickname: string;
  isMe?: boolean;
}

const EtcProductList = ({ isMe, boardId, sellerNickname }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [list, setList] = useState<EtcProduct[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const URL = `/board/used-item/${
          isMe ? 'similar' : 'other'
        }-posts/${boardId}${isMe ? '' : `?limit=${6}`}`;

        const { data } = await axios.get(URL);
        const res =
          data[isMe ? 'similarUsedItemBoardList' : 'otherUsedItemBoardList'];

        setList(res);
      } catch (error) {}
    };

    fetch();
  }, []);

  if (!list.length) {
    return null;
  }

  return (
    <View
      style={{
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <Text style={[TYPOS.headline2, { color: Color.black }]}>
          {isMe ? '이 상품과 유사해요' : `${sellerNickname}님이 판매중인 상품`}
        </Text>

        {!isMe && (
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              navigation.push('UserProductList', {
                id: boardId,
                name: sellerNickname,
              });
            }}
          >
            <Text style={[TYPOS.small, { color: Color.neutral2 }]}>
              모두보기
            </Text>
            <Right16 color={Color.neutral2} />
          </Pressable>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {list.map((item) => (
          <VerticalProductCard
            key={item.id}
            {...item}
            style={{ marginBottom: 24 }}
            onPressHandler={() => {
              navigation.push('ProductDetail', {
                id: item.id,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default EtcProductList;
