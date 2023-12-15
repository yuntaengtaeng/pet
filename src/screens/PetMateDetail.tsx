import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import ScrollContainer from '../components/layout/ScrollContainer';
import Header from '../components/ui/Header';
import { View, Text } from 'react-native';
import Color from '../constants/color';
import Button from '../components/ui/buttons/Button';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MateRequestLabel from '../components/ui/MateRequestLabel';
import Tag from '../components/ui/Tag';
import TYPOS from '../components/ui/typo';
import useAddressVerification from '../hooks/useAddressVerification';
import useModal from '../hooks/useModal';
import AddressBottomSheet from '../components/ui/AddressBottomSheet';
import useDogCheckOrRegisterRedirect from '../hooks/useDogCheckOrRegisterRedirect';
import { Pet, PetMateStatus } from '../types/interface';
import HeaderDropdownMenu from '../components/ui/HeaderDropdownMenu';
import Burger24 from '../components/ui/icons/Burger24';
import Schedule16 from '../components/ui/icons/Schedule16';
import Location16 from '../components/ui/icons/Location16';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import useOverlay from '../hooks/overlay/useOverlay';
import Dialog from '../components/ui/Dialog';

export type PetMateDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'PetMateDetail'
>;

interface PetMateBoardInfo {
  title: string;
  content: string;
  date: string;
  place: string;
  totalPets: number;
  participatingPetsCount: number;
  status: PetMateStatus;
  isHost: boolean;
}
interface Participating {
  nickname: string;
  pets: Pet[];
  isHost: boolean;
  profileImage: string;
}

const PetMateDetail = ({ navigation, route }: PetMateDetailScreenProps) => {
  const [petMateBoardInfo, setPetMateBoardInfo] =
    useState<PetMateBoardInfo | null>(null);
  const [participatingList, setParticipatingList] = useState<Participating[]>(
    []
  );
  const setIsLoading = useSetRecoilState(LoadingState);
  const overlay = useOverlay();

  const {
    isVisible: isVisibleBottomSheet,
    openModal: openBottomSheet,
    closeModal: closeBottomSheet,
  } = useModal();

  const timerRef = useRef<NodeJS.Timeout | undefined>();

  const { id } = route.params;

  const { validate } = useDogCheckOrRegisterRedirect({
    onValidAction: () => {
      navigation.navigate('ApplyPetMate', { id: id, selectedPets: [] });
    },
  });

  const { verifyNeighborhood } = useAddressVerification({
    locationVerificationPopupContent: '참여 신청하려면 동네인증이 필요해요.',
    successCallback: () => {
      validate();
    },
    onNeighborhoodChangeHandler: () => {
      timerRef.current = setTimeout(() => {
        openBottomSheet();
      }, 300);
    },
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get<{
        petMateBoardInfo: PetMateBoardInfo;
        participatingList: Participating[];
      }>(`/board/pet-mate/${id}`);

      setPetMateBoardInfo(result.data.petMateBoardInfo);
      setParticipatingList(result.data.participatingList);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [navigation, id]);

  if (!petMateBoardInfo) {
    return null;
  }

  const applyForParticipation = () => {
    verifyNeighborhood();
  };

  const removePost = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/board/pet-mate/${id}`);
      navigation.pop();
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteDialog = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content="게시글을 삭제할까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '삭제',
              onPressHandler: () => {
                overlay.close();
                removePost();
              },
            },
            {
              label: '닫기',
              onPressHandler: overlay.close,
            },
          ]}
        />
      </Dialog>
    );
  };

  const onDeleteHandler = (closeMenu: () => void) => {
    closeMenu();
    openDeleteDialog();
  };

  const onStatusChangeHandler = async (status: PetMateStatus) => {
    setIsLoading(true);
    try {
      const result = await axios.patch<{ status: PetMateStatus }>(
        `/board/pet-mate/status/${id}`,
        {
          status,
        }
      );

      setPetMateBoardInfo({ ...petMateBoardInfo, status: result.data.status });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        rightContent={
          petMateBoardInfo.isHost ? (
            <HeaderDropdownMenu
              icon={<Burger24 color={Color.black} />}
              menus={[
                { label: '글 수정하기' },
                { label: '삭제', onClickHandler: onDeleteHandler },
              ]}
            />
          ) : (
            <></>
          )
        }
      />
      <ScrollContainer>
        <View style={{ gap: 24, marginHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Tag
              label={petMateBoardInfo.status}
              theme={
                petMateBoardInfo.status === '모집마감' ? 'warning' : 'success'
              }
            />
            <Text style={[TYPOS.headline3, { color: Color.black }]}>
              {petMateBoardInfo.title}
            </Text>
          </View>
          <View style={{ gap: 16 }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Schedule16 color={Color.neutral1} />
              <Text style={[TYPOS.body2, { color: Color.neutral1 }]}>
                {petMateBoardInfo.date}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Location16 color={Color.neutral1} />
              <Text style={[TYPOS.body2, { color: Color.neutral1 }]}>
                {petMateBoardInfo.place}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[TYPOS.body1, { color: Color.black }]}>
              {petMateBoardInfo.content}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.neutral4,
            height: 1,
            marginVertical: 24,
          }}
        />
        <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
          <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
            참여견수{' '}
          </Text>
          <Text style={[TYPOS.headline4, { color: Color.primary900 }]}>
            {petMateBoardInfo.participatingPetsCount}
          </Text>
          <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
            /{petMateBoardInfo.totalPets}
          </Text>
        </View>
        <View style={{ marginTop: 16 }}>
          {participatingList.map((item) => (
            <MateRequestLabel
              containerStyle={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
              image={item.profileImage}
              name={item.nickname}
              isHost={item.isHost}
              pets={item.pets}
              key={item.nickname}
            />
          ))}
        </View>
      </ScrollContainer>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          ...(petMateBoardInfo.isHost && {
            flexDirection: 'row',
            gap: 16,
          }),
        }}
      >
        {petMateBoardInfo.isHost ? (
          <>
            <View style={{ flex: 1 }}>
              <Button
                label="모집 마감하기"
                buttonType="secondary"
                onPressHandler={() => {
                  onStatusChangeHandler('모집마감');
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                label={`신청한 메이트 ${participatingList.length - 1}명`}
                onPressHandler={() => {
                  navigation.navigate('PetMateRequestList', { id: id });
                }}
              />
            </View>
          </>
        ) : (
          <>
            <Button label="참여 신청" onPressHandler={applyForParticipation} />
          </>
        )}
      </View>
      <AddressBottomSheet
        isVisibleBottomSheet={isVisibleBottomSheet}
        onCloseHandler={closeBottomSheet}
      />
    </>
  );
};

export default PetMateDetail;
