import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppBar from '../components/ui/AppBar';
import { ScrollView } from 'react-native';

export type OnboardingScreenProps = StackScreenProps<
  RootStackParamList,
  'ChatRoom'
>;

const ChatRoom = ({ navigation, route }: OnboardingScreenProps) => {
  return (
    <>
      <AppBar />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
      ></ScrollView>
    </>
  );
};

export default ChatRoom;
