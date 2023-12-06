import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useMemo, useState } from 'react';
import Container from '../components/layout/Container';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import { Text, View } from 'react-native';
import TYPOS from '../components/ui/typo';
import Color from '../constants/color';
import Selectable from '../components/ui/Selectable';
import TextArea from '../components/ui/inputs/TextArea';
import Button from '../components/ui/buttons/Button';
import { Pet } from '../types/interface';
import useInputState from '../hooks/useInputState';
import PetSelectBottomSheet from '../components/ui/PetSelectBottomSheet';
import useModal from '../hooks/useModal';
import axios, { AxiosError } from 'axios';
import { ToastDispatchContext } from '../components/ui/toast/ToastProvider';

export type ApplyPetMateScreenProps = StackScreenProps<
  RootStackParamList,
  'ApplyPetMate'
>;

const ApplyPetMate = ({ navigation, route }: ApplyPetMateScreenProps) => {
  const [selectedPets, setSelectedPets] = useState<Pet[]>([
    ...route.params.selectedPets,
  ]);
  const [value, onChange] = useInputState();
  const { isVisible, openModal, closeModal } = useModal();
  const toastDispatch = useContext(ToastDispatchContext);

  const isActiveButton = !!selectedPets.length && value.length < 501;
  const selectedPetNames = useMemo(() => {
    return [...selectedPets].map((pet) => pet.name).join(', ');
  }, [selectedPets]);

  const applyForParticipation = async () => {
    try {
      const petIds = selectedPets.map((pet) => pet.id);

      await axios.post(`/board/pet-mate/attend/${route.params.id}`, {
        petIds,
        ...(!!value && {
          message: value,
        }),
      });

      toastDispatch?.showToastMessage('참여신청이 완료되었습니다.');
      navigation.pop();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;

      if (errorResponse?.status === 400) {
        toastDispatch?.showToastMessage('선택 가능 견수를 초과했습니다.');
      }
    }
  };

  return (
    <>
      <Header title="산책 메이트 신청" />
      <Container style={{ paddingHorizontal: 16 }}>
        <Text style={[TYPOS.body2, { color: Color.neutral1, marginBottom: 8 }]}>
          함께할 반려동물
        </Text>
        <Selectable onPressHandler={openModal} value={selectedPetNames} />
        <View style={{ marginBottom: 16 }} />
        <TextArea
          isError={value.length > 500}
          placeholder="모임장에게 전하고 싶은 말을 적어주세요."
          errorMessage="최대 글자 수를 초과했어요."
          value={value}
          onChangeHandler={onChange}
          maxLength={500}
          fieldStyle={{ height: 144 }}
        />
      </Container>
      <View style={{ paddingHorizontal: 16 }}>
        <Button
          label="신청하기"
          disabled={!isActiveButton}
          onPressHandler={applyForParticipation}
        />
      </View>
      <PetSelectBottomSheet
        isVisible={isVisible}
        onClose={closeModal}
        successButtonHandler={(pets) => {
          setSelectedPets(pets);
        }}
        selectedPets={selectedPets}
      />
    </>
  );
};

export default ApplyPetMate;
