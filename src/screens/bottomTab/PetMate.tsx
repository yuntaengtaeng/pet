import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import { Pressable, Text, View } from 'react-native';
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
import Person24 from '../../components/ui/icons/Person24';

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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={[TYPOS.headline3, { color: Color.black }]}>펫 메이트</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('MyMate');
          }}
        >
          <Person24 color={Color.neutral1} />
        </Pressable>
      </View>
      <Tabs
        selectedIndex={tap}
        onSelectHandler={(index) => {
          setTap(index);
        }}
        menu={['산책 모집', '산책 기록']}
      />
      {tap === 0 ? <Recruitment /> : <WalkingLog />}
    </>
  );
};

export default PetMate;
