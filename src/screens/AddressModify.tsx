import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import Address from '../components/form/Address';
import { RootStackParamList } from '../types/navigation';
import { Location } from '../types/interface';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import axios, { AxiosError } from 'axios';
import useModal from '../hooks/useModal';
import Dialog from '../components/ui/Dialog';

export type AddressRegistrationScreenProps = StackScreenProps<
  RootStackParamList,
  'AddressModify'
>;

const AddressModify = ({
  navigation,
  route,
}: AddressRegistrationScreenProps) => {
  const { isVisible, openModal, closeModal } = useModal();
  const [errorMessage, setErrorMessage] = useState('');
  const setIsLoading = useSetRecoilState(LoadingState);

  const addressSelectHandler = async ({
    location,
    address,
  }: {
    location: Location;
    address: string;
  }) => {
    setIsLoading(true);
    try {
      const { latitude, longitude } = location;

      await axios.post('/user/addresses', {
        latitude,
        longitude,
      });
      navigation.pop();
    } catch (error) {
      console.log('Add Address Failed');
      const errorResponse = (error as AxiosError).response;
      /*
      400
      - 추가하려는 동네가 이미 존재
      412
      - 동네가 이미 2개인 경우
      */
      if (errorResponse?.status === 400 || errorResponse?.status === 412) {
        setErrorMessage(
          errorResponse?.status === 400
            ? '동네가 이미 존재해요.'
            : '동네가 2개라 추가할 수 없어요.'
        );

        openModal();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Address addressSelectHandler={addressSelectHandler} />
      <Dialog isOpened={isVisible}>
        <Dialog.Title title={errorMessage} />
        <Dialog.Buttons
          buttons={[
            {
              label: '확인',
              onPressHandler: closeModal,
            },
          ]}
        />
      </Dialog>
    </>
  );
};

export default AddressModify;
