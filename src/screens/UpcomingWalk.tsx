import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppBar from '../components/ui/AppBar';
import UpcomingWalkList from '../components/petMate/UpcomingWalkList';
import { ScrollView } from 'react-native';
import Color from '../constants/color';

export type UpcomingWalkScreenProps = StackScreenProps<
  RootStackParamList,
  'UpcomingWalk'
>;

const UpcomingWalk = ({ navigation, route }: UpcomingWalkScreenProps) => {
  return (
    <>
      <AppBar title="나의 메이트" />
      <ScrollView
        style={{ flex: 1, backgroundColor: Color.neutral5 }}
        showsVerticalScrollIndicator={false}
      >
        <UpcomingWalkList
          containerStyle={{
            marginTop: 24,
            marginBottom: 16,
            marginHorizontal: 16,
          }}
        />
      </ScrollView>
    </>
  );
};

export default UpcomingWalk;
