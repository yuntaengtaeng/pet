import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { DOG_CATEGORY, CAT_CATEGORY } from '../../constants/category';
import Container from '../layout/Container';
import ChipContainer from '../ui/ChipContainer';
import ProductCard from '../ui/ProductCard';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import useDidUpdate from '../../hooks/useDidUpdate';
import { LoadingState } from '../../store/atoms';
import {
  DogCategory,
  CatCategory,
  PetType,
  Product,
} from '../../types/interface';
import { HomeStateContext } from './HomeStateContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

const LIMIT = 20;

const ProductList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const isDog: boolean = true;
  type SelectedCategory = typeof isDog extends true ? DogCategory : CatCategory;
  const setLoading = useSetRecoilState(LoadingState);

  const petType = useContext(HomeStateContext) as PetType;
  const [category, setCategory] = useState<SelectedCategory>('전체');
  const [page, setPage] = useState(0);
  const [list, setList] = useState<Product[]>([]);

  const requestProduct = async ({
    isPageResetting,
    initCategory,
  }: {
    isPageResetting?: boolean;
    initCategory?: '전체';
  } = {}) => {
    const categoryValue = initCategory || category;

    const queryString = Object.entries({
      topCategory: { dog: '강아지', cat: '고양이' }[petType],
      ...(categoryValue !== '전체' && { subCategory: categoryValue }),
      limit: LIMIT,
      page: isPageResetting ? 0 : page,
    })
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    setLoading(true);

    try {
      const {
        data: {
          data: { usedItemBoardList },
        },
      } = await axios.get<{ data: { usedItemBoardList: Product[] } }>(
        `/board/used-item?${queryString}`
      );

      setPage(isPageResetting ? 1 : page + 1);

      if (isPageResetting) {
        setList(usedItemBoardList);
      } else {
        setList([...list, ...usedItemBoardList]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useDidUpdate(() => {
    setCategory('전체');
    requestProduct({ isPageResetting: true, initCategory: '전체' });
  }, [petType]);

  useDidUpdate(() => {
    requestProduct({ isPageResetting: true });
  }, [category]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      requestProduct({ isPageResetting: true });
    });

    return unsubscribe;
  }, [navigation, category]);

  return (
    <Container>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{
          marginTop: 32,
          marginHorizontal: 16,
          marginBottom: 24,
        }}
      >
        <ChipContainer
          containerStyle={{
            flexDirection: 'row',
            height: 40,
          }}
          labels={isDog ? DOG_CATEGORY : CAT_CATEGORY}
          selectedLabel={category}
          type="single"
          chipStyle={{ marginRight: 8 }}
          onSelectedHandler={(label: string) => {
            if (label) {
              setCategory(label as SelectedCategory);
            }
          }}
        />
      </ScrollView>
      <FlatList
        style={{
          height: '100%',
        }}
        onEndReached={() => {
          requestProduct();
        }}
        data={list}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id}
            {...item}
            onPressHandler={() => {
              //TODO : 상세 이동 등록하기
            }}
          />
        )}
      />
    </Container>
  );
};

export default ProductList;
