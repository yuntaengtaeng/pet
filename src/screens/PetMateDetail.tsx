import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import ScrollContainer from '../components/layout/ScrollContainer';
import Header from '../components/ui/Header';
import { View, Text } from 'react-native';
import Color from '../constants/color';
import Button from '../components/ui/buttons/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MateRequestLabel from '../components/ui/MateRequestLabel';
import Tag from '../components/ui/Tag';
import TYPOS from '../components/ui/typo';

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
}
interface Participating {
  nickname: string;
  petCount: number;
  isHost: boolean;
  profileImage: string;
}

const PetMateDetail = ({ navigation, route }: PetMateDetailScreenProps) => {
  const [petMateBoardInfo, setPetMateBoardInfo] =
    useState<PetMateBoardInfo | null>(null);
  const [participatingList, setParticipatingList] = useState<Participating[]>(
    []
  );

  const { id } = route.params;

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

  return (
    <>
      <Header />
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
              petCount={item.petCount}
              key={item.petCount}
            />
          ))}
        </View>
      </ScrollContainer>
      <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
        <Button label="참여 신청" />
      </View>
    </>
  );
};

export default PetMateDetail;
