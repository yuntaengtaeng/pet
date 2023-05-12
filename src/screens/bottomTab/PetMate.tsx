import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import Container from '../../components/layout/Container';
import { Text } from 'react-native';
import TYPOS from '../../components/ui/typo';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type PetMateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'PetMate'>,
  StackNavigationProp<RootStackParamList>
>;

const PetMate = () => {
  const navigation = useNavigation<PetMateScreenProps>();

  return (
    <Container>
      <Text style={[TYPOS.headline1]}>PetMate</Text>
    </Container>
  );
};

export default PetMate;
