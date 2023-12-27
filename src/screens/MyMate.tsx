import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppBar from '../components/ui/AppBar';
import { ScrollView, View } from 'react-native';
import Color from '../constants/color';
import MateCard from '../components/ui/MateCard';
import Tabs from '../components/ui/Tabs';
import Line from '../components/form/PetMate/Line';
import React from 'react';
import UpcomingWalkList from '../components/petMate/UpcomingWalkList';

export type AddPetMateScreenProps = StackScreenProps<
  RootStackParamList,
  'MyMate'
>;

const MyMate = ({ navigation, route }: AddPetMateScreenProps) => {
  return (
    <>
      <AppBar title="나의 메이트" />
      <ScrollView
        style={{ flex: 1, backgroundColor: Color.neutral5 }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <UpcomingWalkList
          containerStyle={{
            marginTop: 24,
            marginBottom: 16,
            marginHorizontal: 16,
          }}
          hasMoreButton={true}
        />
        <Tabs
          selectedIndex={0}
          onSelectHandler={(index) => {}}
          menu={['참여한 산책', '작성한 글']}
        />
        <View>
          {[...new Array(30)].map((v, index) => (
            <React.Fragment key={index}>
              <MateCard
                gap={4}
                title={'중계 근린 공원 산책하실 분~'}
                description={'공릉동 · 10/21(토), 오후 10시'}
                descriptionSize={3}
              />
              <Line />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default MyMate;
