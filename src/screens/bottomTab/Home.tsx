import React from 'react';
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
import { Text } from 'react-native';
import TYPOS from '../../components/ui/typo';

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const dummyData = [
  {
    id: 1,
    title: '잘먹잘싸 냥이 사료 2kg 새제품',
    subTitle: '역삼동 · 어제',
    price: 11500,
    likeCount: 3,
    commentCount: 10,
  },
  {
    id: 2,
    title: '고양이 장난감 3종 세트',
    subTitle: '삼성동 · 2일 전',
    price: 5000,
    likeCount: 12,
    commentCount: 5,
  },
];

const Home = () => {
  const navigation = useNavigation<HomeScreenProps>();

  return (
    <Container>
      <Text style={[TYPOS.headline1]}>MyPet</Text>
    </Container>
  );
};

export default Home;
