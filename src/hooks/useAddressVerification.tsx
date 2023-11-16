import axios, { AxiosError } from 'axios';
import Dialog from '../components/ui/Dialog';
import useOverlay from './overlay/useOverlay';
import * as Location from 'expo-location';
import { ToastDispatchContext } from '../components/ui/toast/ToastProvider';
import { useContext } from 'react';

interface Props {
  successCallback: () => void;
  onNeighborhoodChangeHandler: () => void;
  locationVerificationPopupContent: string;
}

const useAddressVerification = ({
  successCallback,
  onNeighborhoodChangeHandler,
  locationVerificationPopupContent,
}: Props) => {
  const overlay = useOverlay();
  const toastDispatch = useContext(ToastDispatchContext);

  const openLocationVerificationRequestedPopup = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Title title="인증 지역을 확인해주세요" />
        <Dialog.Content content="선택한 위치와 현재 위치가 같아야 인증됩니다." />
        <Dialog.Buttons
          buttons={[
            {
              label: '닫기',
              onPressHandler: overlay.close,
            },
            {
              label: '동네 변경',
              onPressHandler: () => {
                overlay.close();
                onNeighborhoodChangeHandler();
              },
            },
          ]}
        />
      </Dialog>
    );
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

      successCallback();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        openLocationVerificationRequestedPopup();
      }
    }
  };

  const openLocationVerificationPopup = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content={locationVerificationPopupContent} />
        <Dialog.Buttons
          buttons={[
            {
              label: '닫기',
              onPressHandler: overlay.close,
            },
            {
              label: '인증하기',
              onPressHandler: () => {
                overlay.close();
                requestNeighborhoodVerification();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  const verifyNeighborhood = async () => {
    try {
      const { data } = await axios.get('/auth/local-area');
      successCallback();
      //   moveEdit();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        openLocationVerificationPopup();
      }
    }
  };

  return { verifyNeighborhood };
};

export default useAddressVerification;
