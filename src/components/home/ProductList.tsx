import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, FlatList, Dimensions } from 'react-native';
import { DOG_CATEGORY, CAT_CATEGORY } from '../../constants/category';
import Container from '../layout/Container';
import { ChipContainerScrollView } from '../ui/ChipContainer';
import ProductCard from '../ui/ProductCard';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDidUpdate from '../../hooks/useDidUpdate';
import { LoadingState, UserState } from '../../store/atoms';
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
import EmptyList from './EmptyList';
import FixedWriteButton from './FixedWriteButton';

const fullWidth = Dimensions.get('window').width;

const LIMIT = 20;

const ProductList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const user = useRecoilValue(UserState);

  const petType = useContext(HomeStateContext) as PetType;

  const isDog: boolean = petType === 'dog';
  type SelectedCategory = typeof isDog extends true ? DogCategory : CatCategory;
  const setLoading = useSetRecoilState(LoadingState);

  const [category, setCategory] = useState<SelectedCategory>('전체');
  const [page, setPage] = useState(0);
  const [list, setList] = useState<Product[]>([]);

  const isRequestList = useRef(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const requestProduct = async ({
    isPageResetting,
    initCategory,
  }: {
    isPageResetting?: boolean;
    initCategory?: '전체';
  } = {}) => {
    if (isRequestList.current) {
      return;
    }

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
    isRequestList.current = true;

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
      isRequestList.current = false;
    }
  };

  useDidUpdate(() => {
    setCategory('전체');
    requestProduct({ isPageResetting: true, initCategory: '전체' });

    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({ x: 0 });
    }
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

  useDidUpdate(() => {
    requestProduct({ isPageResetting: true });
  }, [user.address]);

  return (
    <>
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
          <ChipContainerScrollView
            containerStyle={{
              height: 40,
              width: fullWidth - 32,
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
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          />
        </ScrollView>
        <FlatList
          style={{
            height: '100%',
          }}
          onEndReached={() => {
            requestProduct();
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          data={list}
          ListEmptyComponent={<EmptyList />}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
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
      </Container>
      {list.length > 0 && <FixedWriteButton />}
    </>
  );
};

export default ProductList;
