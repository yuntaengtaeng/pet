import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Address from '../../components/form/Address';
import { Location } from '../../types/interface';

export type AddressRegistrationScreenProps = StackScreenProps<
  RootStackParamList,
  'AddressRegistration'
>;

const AddressRegistration = ({
  navigation,
  route,
}: AddressRegistrationScreenProps) => {
  const { email } = route.params;

  const addressSelectHandler = ({
    location,
    address,
  }: {
    location: Location;
    address: string;
  }) => {
    navigation.push('FillProfile', {
      location,
      address,
      email: email as string,
    });
  };

  return <Address addressSelectHandler={addressSelectHandler} />;
};

export default AddressRegistration;
