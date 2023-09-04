import React, { useState } from 'react';
import useModal from '../../hooks/useModal';
import { PetType } from '../../types/interface';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../store/atoms';
import LocationVerificationPopup from './LocationVerificationPopup';
import LocationVerificationRequested from './LocationVerificationRequested';
import AddressBottomSheet from './AddressBottomSheet';
import { HomeDispatchContext, HomeDispatch } from './HomeDispatchContext';
import { HomeStateContext } from './HomeStateContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosError } from 'axios';
import { RootStackParamList } from '../../types/navigation';

const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(UserState);
  const [petType, setPetType] = useState<PetType>(user.petType);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const togglePetType = () => {
    setPetType((prev) => (prev === 'dog' ? 'cat' : 'dog'));
  };

  const {
    isVisible: isVisibleBottomSheet,
    openModal: openBottomSheet,
    closeModal: closeBottomSheet,
  } = useModal();

  const {
    isVisible: isLocationVerificationPopupVisible,
    openModal: openLocationVerificationPopup,
    closeModal: closeLocationVerificationPopup,
  } = useModal();

  const {
    isVisible: isLocationVerificationRequested,
    openModal: openLocationVerificationRequested,
    closeModal: closeLocationVerificationRequested,
  } = useModal();

  const moveEdit = async () => {
    navigation.push('EditProduct');
  };

  const verifyNeighborhood = async () => {
    try {
      const { data } = await axios.get('/auth/local-area');
      moveEdit();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        dispatch?.locationVerificationPopup.open();
      }
    }
  };

  const dispatch: HomeDispatch = {
    bottomSheetController: {
      open: () => {
        openBottomSheet();
      },
      close: closeBottomSheet,
    },
    locationVerificationPopup: {
      open: openLocationVerificationPopup,
      close: closeLocationVerificationPopup,
    },
    locationVerificationRequested: {
      open: openLocationVerificationRequested,
      close: closeLocationVerificationRequested,
    },
    togglePetType,
    verifyNeighborhood,
  };

  return (
    <HomeStateContext.Provider value={petType}>
      <HomeDispatchContext.Provider value={dispatch}>
        {children}
        <LocationVerificationPopup
          isLocationVerificationPopupVisible={
            isLocationVerificationPopupVisible
          }
        />
        <LocationVerificationRequested
          isLocationVerificationRequested={isLocationVerificationRequested}
        />
        <AddressBottomSheet isVisibleBottomSheet={isVisibleBottomSheet} />
      </HomeDispatchContext.Provider>
    </HomeStateContext.Provider>
  );
};

export default HomeProvider;
