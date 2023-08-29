import React from 'react';
import Container from '../components/layout/Container';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Text } from 'react-native';

export type AppointmentSchedulerScreenProps = StackScreenProps<
  RootStackParamList,
  'AppointmentScheduler'
>;

const AppointmentScheduler = ({
  navigation,
  route,
}: AppointmentSchedulerScreenProps) => {
  return (
    <Container>
      <Text>AppointmentScheduler</Text>
    </Container>
  );
};

export default AppointmentScheduler;
