import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../types/navigation';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Container from '../../components/layout/Container';
import TYPOS from '../../components/ui/typo';
import AppBar from '../../components/ui/AppBar';
import InputField from '../../components/ui/inputs/InputField';
import Button from '../../components/ui/buttons/Button';
import UiCheckbox from '../../components/ui/UiCheckbox';
import Color from '../../constants/color';
import Camera16 from '../../components/ui/icons/Camera16';
import * as MediaLibrary from 'expo-media-library';
import useDebounce from '../../hooks/useDebounce';
import axios, { AxiosError } from 'axios';
import { User } from '../../types/interface';
import { useSetRecoilState } from 'recoil';
import { UserState, LoadingState } from '../../store/atoms';
import { PetType } from '../../types/interface';
import useInputState from '../../hooks/useInputState';
import useModal from '../../hooks/useModal';
import BottomSheet from '../../components/ui/BottomSheet';

export type FillProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'FillProfile'
>;

const FillProfile = ({ navigation, route }: FillProfileScreenProps) => {
  const { location, address, email } = route.params;

  const [nickname, setNickname] = useInputState('');
  const [selectedPetType, setSelectedPetType] = useState<PetType | ''>('dog');
  const [photo, setPhoto] = useState<MediaLibrary.Asset | null>(null);
  const debouncedValue = useDebounce<string>(nickname, 300);
  const [errorLog, setErrorLog] = useState({
    isError: false,
    message: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const isAllConditionsMet =
    !!nickname &&
    !!address &&
    !errorLog.isError &&
    (!!selectedPetType || isChecked);
  const setUser = useSetRecoilState(UserState);
  const setIsLoading = useSetRecoilState(LoadingState);

  const { isVisible, openModal, closeModal } = useModal();

  const checkDuplicateNickname = async () => {
    try {
      await axios.post('/auth/nickname', {
        nickname,
      });

      setErrorLog({ isError: false, message: '' });
    } catch (error) {
      const errorResponse = (error as AxiosError).response;

      if (errorResponse) {
        const { message } = errorResponse.data as { message: string };
        setErrorLog({ isError: true, message });
      }
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      checkDuplicateNickname();
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (selectedPetType) {
      setIsChecked(false);
    }
  }, [selectedPetType]);

  const onSubmit = async () => {
    if (errorLog.isError) {
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('nickname', nickname);
    formData.append('petType', isChecked ? 'dog' : selectedPetType);
    formData.append(
      'address',
      JSON.stringify({
        detail: address,
        longitude: location.longitude,
        latitude: location.latitude,
      })
    );

    if (photo) {
      const { localUri } = await MediaLibrary.getAssetInfoAsync(photo);
      formData.append('profileImage', {
        uri: localUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
    }

    setIsLoading(true);

    try {
      const {
        data: { data },
      } = await axios.post<{ data: User }>('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(data);
      navigation.reset({ routes: [{ name: 'BottomNavigation' }] });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppBar />
      <Container style={{ paddingHorizontal: 16 }}>
        <Text style={TYPOS.headline1}>프로필을 완성해주세요.</Text>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 32,
          }}
        >
          <Pressable
            style={{ position: 'relative' }}
            onPress={() => {
              openModal();
            }}
          >
            <Image
              style={{ width: 80, height: 80, borderRadius: 80 }}
              source={
                photo
                  ? { uri: photo.uri }
                  : require('../../../assets/img/placeholder.png')
              }
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 24,
                height: 24,
                backgroundColor: Color.primary600,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Camera16 color={Color.white} />
            </View>
          </Pressable>
        </View>
        <View>
          <InputField
            placeholder="닉네임"
            value={nickname}
            isError={errorLog.isError}
            errorMessage={errorLog.message}
            onChangeHandler={setNickname}
          />
        </View>
        <View>
          <Text
            style={[
              TYPOS.headline4,
              {
                marginTop: 56,
                marginBottom: 24,
              },
            ]}
          >
            키우고 있는 반려동물을 선택해주세요
          </Text>
          <View style={styles.cardContainer}>
            <Pressable
              style={[
                styles.card,
                {
                  ...(selectedPetType === 'dog' && {
                    borderColor: Color.primary600,
                  }),
                },
              ]}
              onPress={() => {
                setSelectedPetType('dog');
              }}
            >
              <Text style={TYPOS.headline1}>🐶</Text>
              <Text style={[TYPOS.body1, { color: Color.black }]}>강아지</Text>
            </Pressable>
            <Pressable
              style={[
                styles.card,
                {
                  ...(selectedPetType === 'cat' && {
                    borderColor: Color.primary600,
                  }),
                },
              ]}
              onPress={() => {
                setSelectedPetType('cat');
              }}
            >
              <Text style={TYPOS.headline1}>😺</Text>
              <Text style={[TYPOS.body1, { color: Color.black }]}>고양이</Text>
            </Pressable>
          </View>
          <UiCheckbox
            isChecked={isChecked}
            onValueChangeHandler={(value) => {
              if (value) {
                setSelectedPetType('');
              }

              setIsChecked(value);
            }}
          >
            <Text style={TYPOS.body2}>반려동물을 키우고 있지 않아요.</Text>
          </UiCheckbox>
        </View>
      </Container>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          marginHorizontal: 16,
        }}
      >
        <Button
          label="확인"
          buttonType="primary"
          onPressHandler={onSubmit}
          disabled={!isAllConditionsMet}
        />
      </View>
      <BottomSheet
        isOpened={isVisible}
        onClose={() => {
          closeModal();
        }}
        height={310}
        title=" 프로필 이미지 변경"
      >
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View>
            <Pressable
              style={{ padding: 16 }}
              onPress={() => {
                closeModal();
                navigation.navigate('Gallery', {
                  limit: 1,
                  callback: (medias) => {
                    const media = medias[0];
                    setPhoto(media);
                  },
                  ...(photo && {
                    selectedPhotoIds: [photo],
                  }),
                });
              }}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>
                앨범에서 선택
              </Text>
            </Pressable>
            <Pressable
              style={{ padding: 16 }}
              onPress={() => {
                closeModal();
                setPhoto(null);
              }}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>
                기본이미지로 변경
              </Text>
            </Pressable>
          </View>
          <View style={{ marginHorizontal: 16, marginTop: 24 }}>
            <Button label="닫기" onPressHandler={closeModal} />
          </View>
        </View>
      </BottomSheet>
    </>
  );
};
export default FillProfile;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    height: 100,
    width: '48%',
    borderWidth: 1,
    borderColor: Color.neutral4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
