import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import Container from '../../components/layout/Container';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import FixedWriteButton from '../../components/home/FixedWriteButton';
import Header from '../../components/home/Header';
import ChipContainer from '../../components/ui/ChipContainer';
import { FlatList, ScrollView } from 'react-native';
import ProductCard from '../../components/ui/ProductCard';
import { PetType } from '../../types/interface';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoadingState, UserState } from '../../store/atoms';
import { DogCategory, CatCategory, Product } from '../../types/interface';
import { DOG_CATEGORY, CAT_CATEGORY } from '../../constants/category';
import axios from 'axios';
import useDidUpdate from '../../hooks/useDidUpdate';

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const LIMIT = 20;

const Home = () => {
  const navigation = useNavigation<HomeScreenProps>();
  const isDog: boolean = true;
  type SelectedCategory = typeof isDog extends true ? DogCategory : CatCategory;
  const user = useRecoilValue(UserState);
  const [petType, setPetType] = useState<PetType>(user.petType);
  const [category, setCategory] = useState<SelectedCategory>('전체');
  const [page, setPage] = useState(0);
  const [list, setList] = useState<Product[]>([]);
  const setLoading = useSetRecoilState(LoadingState);

  const togglePetType = () => {
    setPetType((prev) => (prev === 'dog' ? 'cat' : 'dog'));
  };

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
      requestProduct();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Header petType={petType} togglePetType={togglePetType} />
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
      <FixedWriteButton />
    </>
  );
};

export default Home;
