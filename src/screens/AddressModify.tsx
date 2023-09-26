import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import Address from '../components/form/Address';
import { RootStackParamList } from '../types/navigation';
import { Location } from '../types/interface';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import axios, { AxiosError } from 'axios';
import Dialog from '../components/ui/Dialog';
import useOverlay from '../hooks/overlay/useOverlay';

export type AddressRegistrationScreenProps = StackScreenProps<
  RootStackParamList,
  'AddressModify'
>;

const AddressModify = ({
  navigation,
  route,
}: AddressRegistrationScreenProps) => {
  const overlay = useOverlay();
  const setIsLoading = useSetRecoilState(LoadingState);

  const openErrorDialog = (status: 400 | 412) => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Title
          title={
            status === 400
              ? '동네가 이미 존재해요.'
              : '동네가 2개라 추가할 수 없어요.'
          }
        />
        <Dialog.Buttons
          buttons={[
            {
              label: '확인',
              onPressHandler: overlay.close,
            },
          ]}
        />
      </Dialog>
    );
  };

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
        openErrorDialog(errorResponse?.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <Address addressSelectHandler={addressSelectHandler} />;
};

export default AddressModify;
