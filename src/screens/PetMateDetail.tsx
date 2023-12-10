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
import { Pet } from '../types/interface';
import HeaderDropdownMenu from '../components/ui/HeaderDropdownMenu';
import Burger24 from '../components/ui/icons/Burger24';

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
  status: '모집중' | '모집마감';
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

      console.log(result.data.participatingList);

      setPetMateBoardInfo(result.data.petMateBoardInfo);
      setParticipatingList(result.data.participatingList);
    };

    fetch();
  }, [id]);

  if (!petMateBoardInfo) {
    return null;
  }

  const applyForParticipation = () => {
    verifyNeighborhood();
  };

  return (
    <>
      <Header
        rightContent={
          petMateBoardInfo.isHost ? (
            <HeaderDropdownMenu
              icon={<Burger24 color={Color.black} />}
              menus={[{ label: '글 수정하기' }, { label: '삭제' }]}
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
            <View>
              <Text style={[TYPOS.body2, { color: Color.neutral1 }]}>
                {petMateBoardInfo.date}
              </Text>
            </View>
            <View>
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
              <Button label="모집 마감하기" buttonType="secondary" />
            </View>
            <View style={{ flex: 1 }}>
              <Button label={`신청한 메이트 ${participatingList.length}명`} />
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
