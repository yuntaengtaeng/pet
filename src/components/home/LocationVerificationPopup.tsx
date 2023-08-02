import React, { useContext } from 'react';
import Dialog from '../ui/Dialog';
import { HomeDispatchContext } from './HomeDispatchContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosError } from 'axios';
import { RootStackParamList } from '../../types/navigation';
import * as Location from 'expo-location';
import { ToastDispatchContext } from '../ui/toast/ToastProvider';

interface Props {
  isLocationVerificationPopupVisible: boolean;
}

const LocationVerificationPopup = ({
  isLocationVerificationPopupVisible,
}: Props) => {
  const dispatch = useContext(HomeDispatchContext);
  const toastDispatch = useContext(ToastDispatchContext);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const moveEdit = async () => {
    navigation.push('EditProduct');
  };

  const getLocation = async () => {
    try {
      const response = await Location.requestForegroundPermissionsAsync();

      if (response.status === 'granted') {
        const location = await Location.getCurrentPositionAsync();
        return {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestNeighborhoodVerification = async () => {
    const response = await getLocation();

    if (!response) {
      return;
    }

    try {
      const { data } = await axios.post('/auth/local-area', {
        ...response,
      });

      toastDispatch?.showToastMessage(
        `‘${data.verifiedLocalArea}’ 동네 인증이 완료!`
      );

      moveEdit();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        dispatch?.locationVerificationRequested.open();
      }
    }
  };

  return (
    <Dialog isOpened={isLocationVerificationPopupVisible}>
      <Dialog.Content content="상품을 게시하려면 동네인증이 필요해요." />
      <Dialog.Buttons
        buttons={[
          {
            label: '닫기',
            onPressHandler: dispatch?.locationVerificationPopup.close,
          },
          {
            label: '인증하기',
            onPressHandler: () => {
              dispatch?.locationVerificationPopup.close();
              requestNeighborhoodVerification();
            },
          },
        ]}
      />
    </Dialog>
  );
};

export default LocationVerificationPopup;
