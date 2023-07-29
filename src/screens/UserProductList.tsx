import React, { useEffect, useState } from 'react';
import Container from '../components/layout/Container';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Header from '../components/ui/Header';
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import VerticalProductCard from '../components/ui/VerticalProductCard';
import { EtcProduct } from '../types/interface';
import TYPOS from '../components/ui/typo';
import Color from '../constants/color';

export type UserProductListScreenProps = StackScreenProps<
  RootStackParamList,
  'UserProductList'
>;

const UserProductList = ({ navigation, route }: UserProductListScreenProps) => {
  const [list, setList] = useState<EtcProduct[]>([]);

  const { id, name } = route.params;

  useEffect(() => {
    const fetch = async () => {
      try {
        const URL = `/board/used-item/other-posts/${id}`;

        const { data } = await axios.get(URL);
        const res = data.otherUsedItemBoardList;
        setList(res);
      } catch (error) {}
    };

    fetch();
  }, []);

  if (!list.length) {
    return null;
  }

  return (
    <>
      <Header />
      <Container>
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <Text style={[TYPOS.headline2, { color: Color.black }]}>
              {name}님이 판매중인 상품
            </Text>
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
        </ScrollView>
      </Container>
    </>
  );
};

export default UserProductList;
