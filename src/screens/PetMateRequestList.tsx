import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSetRecoilState } from 'recoil';
import Header from '../components/ui/Header';
import MateRequestCard from '../components/ui/MateRequestCard';
import TYPOS from '../components/ui/typo';
import Color from '../constants/color';
import { LoadingState } from '../store/atoms';
import { Pet } from '../types/interface';
import { RootStackParamList } from '../types/navigation';
import useOverlay from '../hooks/overlay/useOverlay';
import Dialog from '../components/ui/Dialog';

interface Application {
  id: string;
  pets: Pet[];
  nickname: string;
  profileImage?: string;
  message?: string;
}

export type PetMateRequestListScreenProps = StackScreenProps<
  RootStackParamList,
  'PetMateRequestList'
>;

const PetMateRequestList = ({
  route,
  navigation,
}: PetMateRequestListScreenProps) => {
  const [list, setList] = useState<Application[]>([]);
  const [availableSlots, setAvailableSlots] = useState(0);
  const { id } = route.params;
  const setIsLoading = useSetRecoilState(LoadingState);
  const overlay = useOverlay();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get<{
          applicationList: Application[];
          availableSlots: number;
        }>(`/board/pet-mate/participants/${id}`);

        setList([...result.data.applicationList]);
        setAvailableSlots(result.data.availableSlots);
      } finally {
        setIsLoading(false);
      }
    };

    if (!!id) {
      fetch();
    }
  }, [id]);

  const Empty = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[TYPOS.headline2, { color: Color.neutral1 }]}>
          아직 신청한 메이트가 없어요.
        </Text>
      </View>
    );
  };

  const openNotifyAcceptanceUnavailable = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content="모집 견수를 초과하여 수락할 수 없어요." />
        <Dialog.Buttons
          buttons={[
            {
              label: '확인',
              onPressHandler: overlay.close,
            },
          ]}
        />
      </Dialog>
    );
  };

  const onAcceptHandler = async (applicationId: string, petCount: number) => {
    if (availableSlots < petCount) {
      openNotifyAcceptanceUnavailable();
      return;
    }

    setIsLoading(true);
    try {
      const result = await axios.post<{ applicationList: Application[] }>(
        `/board/pet-mate/participants/${applicationId}`,
        {
          boardId: id,
        }
      );
      setList([...result.data.applicationList]);
    } finally {
      setIsLoading(false);
    }
  };

  const RenderList = () => {
    return (
      <>
        <View
          style={{
            marginTop: 24,
            marginBottom: 16,
            marginHorizontal: 16,
            flexDirection: 'row',
          }}
        >
          <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
            수락 가능 견수{' '}
          </Text>
          <Text style={[TYPOS.headline4, { color: Color.primary900 }]}>
            {availableSlots}
          </Text>
          <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>마리</Text>
        </View>
        <View style={{ marginHorizontal: 16, gap: 16 }}>
          {list.map((application) => (
            <MateRequestCard
              onAcceptHandler={() => {
                onAcceptHandler(application.id, application.pets.length);
              }}
              name={application.nickname}
              pets={application.pets}
              image={application.profileImage}
              message={application.message}
              key={application.id}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <>
      <Header title="신청한 메이트" />
      <View style={{ backgroundColor: Color.neutral5, flex: 1 }}>
        {list.length > 0 ? <RenderList /> : <Empty />}
      </View>
    </>
  );
};

export default PetMateRequestList;
