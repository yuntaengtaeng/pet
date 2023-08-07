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

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Chatting'>,
  StackNavigationProp<RootStackParamList>
>;

const Chatting = () => {
  const navigation = useNavigation<HomeScreenProps>();

  return (
    <Container>
      <Text style={[TYPOS.headline1]}>Chatting</Text>
    </Container>
  );
};

export default Chatting;
