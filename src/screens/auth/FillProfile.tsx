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
import Camera from '../../components/ui/icons/Camera';

import * as MediaLibrary from 'expo-media-library';
import useDebounce from '../../hooks/useDebounce';
import axios, { AxiosError } from 'axios';
import { User } from '../../types/interface';
import { useSetRecoilState } from 'recoil';
import { UserState, LoadingState } from '../../store/atoms';
import { PetType } from '../../types/interface';

export type FillProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'FillProfile'
>;

const FillProfile = ({ navigation, route }: FillProfileScreenProps) => {
  const { location, address, email } = route.params;

  const [nickname, setNickname] = useState<string>('');
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
            <Image
              style={{ width: 80, height: 80, borderRadius: 80 }}
              source={
                photo
                  ? { uri: photo.uri }
                  : require('../../../assets/img/placeholder.png')
              }
            />
            <Camera
              style={{ position: 'absolute', bottom: 0, right: 0 }}
              size={24}
              circleColor={Color.primary700}
              color={Color.white}
            />
          </Pressable>
        </View>
        <View>
          <InputField
            placeholder="닉네임"
            value={nickname}
            isError={errorLog.isError}
            errorMessage={errorLog.message}
            onChangeHandler={(value: string) => {
              setNickname(value);
            }}
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
              <Text>🐶</Text>
              <Text style={TYPOS.body1}>강아지</Text>
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
              <Text>😺</Text>
              <Text style={TYPOS.body1}>고양이</Text>
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
  },
});
