import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ScrollContainer from '../../components/layout/ScrollContainer';
import Header from '../../components/myPage/Header';
import Profile from '../../components/myPage/Profile';
import PetInfo from '../../components/myPage/PetInfo';
import Menu from '../../components/myPage/Menu';

type MyPetScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'MyPage'>,
  StackNavigationProp<RootStackParamList>
>;

const MyPet = () => {
  const navigation = useNavigation<MyPetScreenProps>();

  return (
    <>
      <Header />
      <ScrollContainer>
        <Profile />
        <PetInfo />
        <Menu />
      </ScrollContainer>
    </>
  );
};

export default MyPet;
