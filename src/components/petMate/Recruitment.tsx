import { FlatList, View, Text } from 'react-native';
import Color from '../../constants/color';
import FixedWriteButton from '../ui/FixedWriteButton';
import RecruitmentCard from '../ui/RecruitmentCard';
import UiCheckbox from '../ui/UiCheckbox';
import TYPOS from '../ui/typo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';

interface PetMateBoard {
  id: string;
  title: string;
  region: string;
  date: string;
  totalPets: number;
  participatingPetsCount: number;
  status: '모집중' | '모집마감';
}

const Recruitment = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const page = useRef(0);
  const [list, setList] = useState<PetMateBoard[]>([]);
  const [isOnlyRecruiting, setIsOnlyRecruiting] = useState(false);
  const flatListRef = useRef<FlatList | null>(null);
  const setIsLoading = useSetRecoilState(LoadingState);

  const fetch = async (isNewRequest?: boolean) => {
    setIsLoading(true);

    try {
      if (isNewRequest) {
        page.current = 0;
      } else {
        page.current = page.current + 1;
      }

      const result = await axios.get<{ petMateBoardList: PetMateBoard[] }>(
        `/board/pet-mate?page=${page.current}&limit=20${
          isOnlyRecruiting ? `&isRecruiting=${true}` : ''
        }`
      );

      if (isNewRequest) {
        setList([...result.data.petMateBoardList]);
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      } else {
        setList((prevList) => [...prevList, ...result.data.petMateBoardList]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch(true);
    });

    fetch(true);

    return unsubscribe;
  }, [navigation, isOnlyRecruiting]);

  return (
    <>
      <View
        style={{
          backgroundColor: Color.white,
          padding: 16,
          alignItems: 'flex-end',
        }}
      >
        <UiCheckbox
          isChecked={isOnlyRecruiting}
          size="small"
          onValueChangeHandler={(value) => {
            setIsOnlyRecruiting(value);
          }}
        >
          <Text style={[TYPOS.body2, { color: Color.neutral1 }]}>
            모집중인 글만 보기
          </Text>
        </UiCheckbox>
      </View>
      <FlatList
        style={{
          height: '100%',
          backgroundColor: Color.white,
          paddingTop: 24,
          paddingHorizontal: 16,
        }}
        ref={flatListRef}
        contentContainerStyle={{ flexGrow: 1 }}
        data={list}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: Color.neutral4,
              marginVertical: 16,
            }}
          ></View>
        )}
        renderItem={({ item }) => (
          <RecruitmentCard
            onPressHandler={() => {
              navigation.push('PetMateDetail', {
                id: item.id,
              });
            }}
            key={item.id}
            status={item.status}
            title={item.title}
            description={`${item.region} · ${item.date}`}
            limit={{
              current: item.participatingPetsCount,
              max: item.totalPets,
            }}
          />
        )}
        onEndReached={() => {
          fetch();
        }}
      />
      <FixedWriteButton
        onPressHandler={() => {
          navigation.navigate('AddPetMate');
        }}
      />
    </>
  );
};

export default Recruitment;
