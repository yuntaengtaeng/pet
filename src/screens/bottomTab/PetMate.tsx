import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import { Text, View } from 'react-native';
import TYPOS from '../../components/ui/typo';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Color from '../../constants/color';
import Tabs from '../../components/ui/Tabs';
import Recruitment from '../../components/petMate/Recruitment';
import WalkingLog from '../../components/petMate/WalkingLog';

type PetMateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'PetMate'>,
  StackNavigationProp<RootStackParamList>
>;

const PetMate = () => {
  const navigation = useNavigation<PetMateScreenProps>();
  const [tap, setTap] = useState(0);

  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: Color.white,
        }}
      >
        <Text style={[TYPOS.headline3, { color: Color.black }]}>펫 메이트</Text>
      </View>
      <Tabs
        selectedIndex={tap}
        onSelectHandler={(index) => {
          setTap(index);
        }}
        menu={['모집', '산책 기록']}
      />
      {tap === 0 ? <Recruitment /> : <WalkingLog />}
    </>
  );
};

export default PetMate;
