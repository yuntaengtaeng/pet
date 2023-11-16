import React, { useEffect, useRef, useState } from 'react';
import useModal from '../../hooks/useModal';
import { PetType } from '../../types/interface';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../store/atoms';
import AddressBottomSheet from '../ui/AddressBottomSheet';
import { HomeDispatchContext, HomeDispatch } from './HomeDispatchContext';
import { HomeStateContext } from './HomeStateContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import useAddressVerification from '../../hooks/useAddressVerification';

const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(UserState);
  const [petType, setPetType] = useState<PetType>(user.petType);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const moveEdit = async () => {
    navigation.push('EditProduct');
  };

  const togglePetType = () => {
    setPetType((prev) => (prev === 'dog' ? 'cat' : 'dog'));
  };

  const {
    isVisible: isVisibleBottomSheet,
    openModal: openBottomSheet,
    closeModal: closeBottomSheet,
  } = useModal();

  const timerRef = useRef<NodeJS.Timeout | undefined>();

  const { verifyNeighborhood } = useAddressVerification({
    successCallback: () => {
      moveEdit();
    },
    onNeighborhoodChangeHandler: () => {
      timerRef.current = setTimeout(() => {
        openBottomSheet();
      }, 300);
    },
    locationVerificationPopupContent: '상품을 게시하려면 동네인증이 필요해요.',
  });

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const dispatch: HomeDispatch = {
    bottomSheetController: {
      open: () => {
        openBottomSheet();
      },
      close: closeBottomSheet,
    },
    togglePetType,
    verifyNeighborhood,
  };

  return (
    <HomeStateContext.Provider value={petType}>
      <HomeDispatchContext.Provider value={dispatch}>
        {children}
        <AddressBottomSheet
          isVisibleBottomSheet={isVisibleBottomSheet}
          onCloseHandler={closeBottomSheet}
        />
      </HomeDispatchContext.Provider>
    </HomeStateContext.Provider>
  );
};

export default HomeProvider;
