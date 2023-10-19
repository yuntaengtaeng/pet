import Container from '../../components/layout/Container';
import AppBar from '../../components/ui/AppBar';
import ProfileImageSelector from '../../components/form/ProfileImageSelector';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/ui/buttons/Button';
import TYPOS from '../../components/ui/typo';
import Color from '../../constants/color';
import InputField from '../../components/ui/inputs/InputField';
import { checkDuplicateNickname } from '../../lib/api';
import useOverlay from '../../hooks/overlay/useOverlay';
import Dialog from '../../components/ui/Dialog';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import axios from 'axios';
import Kakao24 from '../../components/ui/icons/Kakao24';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';

export type AddressRegistrationScreenProps = StackScreenProps<
  RootStackParamList,
  'ModifyProfile'
>;

interface UserData {
  nickname: string;
  email: string;
  image: MediaLibrary.Asset | string | null;
}

const ModifyProfile = ({
  navigation,
  route,
}: AddressRegistrationScreenProps) => {
  const overlay = useOverlay();
  const [userData, setUserData] = useState<UserData | null>(null);

  const originData = useRef<UserData | null>(null);
  const [errorLog, setErrorLog] = useState({
    isError: false,
    message: '',
  });
  const isNicknameChanged = useRef(false);
  const setIsLoading = useSetRecoilState(LoadingState);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get<{ userProfile: UserData }>(
        '/my-page/profile'
      );
      const { nickname, image = null, email } = result.data.userProfile;

      setUserData({
        nickname,
        image,
        email,
      });

      originData.current = {
        nickname,
        image,
        email,
      };
    };

    fetch();
  }, []);

  if (!userData) {
    return null;
  }

  const openDialog = (
    type:
      | 'nicknameAvailable'
      | 'requestNicknameInput'
      | 'requestNicknameConfirmation'
      | 'changesNotSaved'
  ) => {
    const [title, content] = (() => {
      switch (type) {
        case 'nicknameAvailable':
          return [null, '사용 가능한 닉네임 입니다.'];
        case 'requestNicknameInput':
          return [null, '닉네임을 입력해주세요.'];
        case 'requestNicknameConfirmation':
          return [null, '닉네임 확인이 필요합니다.'];
        case 'changesNotSaved':
          return ['변경 사항이 저장되지않습니다.', '정말 나갈까요?', []];
      }
    })();

    overlay.open(
      <Dialog isOpened={true}>
        {title && <Dialog.Title title={title} />}
        <Dialog.Content content={content} />
        <Dialog.Buttons
          buttons={
            type === 'changesNotSaved'
              ? [
                  {
                    label: '네',
                    onPressHandler: () => {
                      overlay.close();
                      navigation.pop();
                    },
                  },
                  {
                    label: '아니오',
                    onPressHandler: overlay.close,
                  },
                ]
              : [
                  {
                    label: '확인',
                    onPressHandler: overlay.close,
                  },
                ]
          }
        />
      </Dialog>
    );
  };

  const onSubmit = async () => {
    if (errorLog.isError) {
      openDialog('requestNicknameConfirmation');
      return;
    }

    if (
      originData.current?.nickname !== userData.nickname &&
      !isNicknameChanged.current
    ) {
      openDialog('requestNicknameConfirmation');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('nickname', userData.nickname);

    if (userData.image) {
      if (typeof userData.image === 'string') {
        formData.append('profileImage', userData.image);
      } else {
        const { localUri } = await MediaLibrary.getAssetInfoAsync(
          userData.image as MediaLibrary.Asset
        );

        formData.append('newProfileImage', {
          uri: localUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }
    }

    try {
      await axios.patch('/my-page/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.pop();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const callCheckDuplicateNickname = async () => {
    if (!userData.nickname) {
      openDialog('requestNicknameInput');
      return;
    }

    try {
      await checkDuplicateNickname(userData.nickname);
      setErrorLog({ isError: false, message: '' });
      openDialog('nicknameAvailable');
      isNicknameChanged.current = true;
    } catch (error) {
      if (error instanceof Error) {
        setErrorLog({ isError: true, message: error.message });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <AppBar
        title="프로필 수정"
        onCustomBackButtonHandler={() => {
          if (
            originData.current?.image !== userData.image ||
            originData.current?.nickname !== userData.nickname
          ) {
            openDialog('changesNotSaved');
            return;
          }

          navigation.pop();
        }}
      />
      <Container style={{ marginHorizontal: 16 }}>
        <ProfileImageSelector
          photo={userData.image}
          onPhotoChange={(image) => {
            setUserData({
              ...userData,
              image,
            });
          }}
          containerStyle={{
            marginTop: 8,
            marginBottom: 24,
          }}
        />
        <View>
          <Text
            style={[TYPOS.headline4, { color: Color.black, marginBottom: 8 }]}
          >
            닉네임
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <InputField
              layoutStyle={{ flex: 1, marginRight: 8 }}
              placeholder="닉네임"
              value={userData.nickname}
              isError={errorLog.isError}
              errorMessage={errorLog.message}
              onChangeHandler={(value) => {
                setUserData({
                  ...userData,
                  nickname: value,
                });
                isNicknameChanged.current = false;
              }}
            />
            <Button
              label="중복확인"
              width={104}
              onPressHandler={callCheckDuplicateNickname}
            />
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text
            style={[TYPOS.headline4, { color: Color.black, marginBottom: 8 }]}
          >
            로그인 정보
          </Text>
          <View
            style={{
              height: 48,
              flexDirection: 'row',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Color.neutral2,
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 16,
            }}
          >
            <Kakao24 />
            <Text style={[TYPOS.body1, { color: Color.black }]}>
              {userData.email}
            </Text>
          </View>
        </View>
      </Container>
      <View style={{ paddingHorizontal: 16 }}>
        <Button label="저장" buttonType="primary" onPressHandler={onSubmit} />
      </View>
    </>
  );
};

export default ModifyProfile;
