import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

export type ModifyProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'ModifyProfile'
>;

const ModifyProfile = ({ navigation, route }: ModifyProfileScreenProps) => {
  return <></>;
};

export default ModifyProfile;
