import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { FlatList } from 'react-native-gesture-handler';
import { useSetRecoilState } from 'recoil';
import EmptyList from '../../components/myPage/EmptyList';
import AppBar from '../../components/ui/AppBar';
import ProductCard from '../../components/ui/ProductCard';
import { LoadingState } from '../../store/atoms';
import { Product } from '../../types/interface';
import axios from 'axios';

export type FavoriteProductsScreenProps = StackScreenProps<
  RootStackParamList,
  'FavoriteProducts'
>;

const FavoriteProducts = ({
  navigation,
  route,
}: FavoriteProductsScreenProps) => {
  const [favoriteList, setFavoriteList] = useState<Product[]>([]);
  const setIsLoading = useSetRecoilState(LoadingState);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<{ likeBoards: Product[] }>(
          '/board/used-item/likes'
        );
        setFavoriteList(data.likeBoards);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <AppBar title="관심물품" />
      <FlatList
        style={{
          height: '100%',
        }}
        ListEmptyComponent={
          <EmptyList
            title="관심물품이 없어요."
            description="맘에 드는 상품을 추가해보세요!"
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        data={[...favoriteList]}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id}
            {...item}
            onPressHandler={() => {
              navigation.navigate('ProductDetail', {
                id: item.id,
              });
            }}
          />
        )}
      />
    </>
  );
};

export default FavoriteProducts;
