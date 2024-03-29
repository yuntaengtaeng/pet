import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/ui/Header';
import { Pressable, Text, Image, View, ScrollView } from 'react-native';
import TYPOS from '../../components/ui/typo';
import Color from '../../constants/color';
import ScrollContainer from '../../components/layout/ScrollContainer';
import Carousel from '../../components/ui/carousel/Carousel';
import axios from 'axios';
import TextIconButton from '../../components/ui/buttons/TextIconButton';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';
import { Pet } from '../../types/interface';
import PetItem from '../../components/ui/PetItem';
import useConfirmDeletion from '../../hooks/useConfirmDeletion';

interface PetInfo {
  name: string;
  gender: '남아' | '여아';
  species: string;
  birthday: string;
  unusualCondition?: string;
  neuteredStatus?: '미완료' | '완료' | '모름';
  helloMessage?: string;
  weight?: string;
  images?: string[];
  otherPets?: Pet[];
}

export type PetDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'PetDetail'
>;

const PetDetail = ({ navigation, route }: PetDetailScreenProps) => {
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const setIsLoading = useSetRecoilState(LoadingState);
  const { petId } = route.params;
  const confirmDeletion = useConfirmDeletion();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get<{ petInfo: PetInfo }>(
          `/my-page/pet/${petId}`
        );

        setPetInfo(data.petInfo);
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [navigation, petId]);

  if (!petInfo) {
    return null;
  }

  const onRequestDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/my-page/pet/${petId}`);
      navigation.pop();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        title="반려동물 정보"
        rightContent={
          <Pressable
            onPress={() => {
              confirmDeletion(
                { content: '반려동물 정보를 삭제할까요?' },
                onRequestDelete
              );
            }}
          >
            <Text style={[TYPOS.medium, { color: Color.neutral2 }]}>
              삭제하기
            </Text>
          </Pressable>
        }
      />
      <ScrollContainer>
        {petInfo.images && (
          <Carousel
            data={petInfo.images}
            renderItem={(item: string) => (
              <Image
                source={{ uri: item }}
                style={{ flex: 1, resizeMode: 'cover', height: 100 }}
              />
            )}
          />
        )}
        <View style={{ marginHorizontal: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 24,
            }}
          >
            <View style={{ gap: 8 }}>
              <Text style={[TYPOS.headline2, { color: Color.black }]}>
                {petInfo.name}
              </Text>
              <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>
                {petInfo.gender} / {petInfo.species}
              </Text>
            </View>
            <TextIconButton
              label="수정"
              onPressHandler={() => {
                navigation.navigate('ModifyPet', {
                  id: petId,
                });
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: Color.neutral4,
              marginVertical: 16,
            }}
          />
          <View
            style={{
              borderRadius: 5,
              backgroundColor: Color.neutral5,
              padding: 16,
              minHeight: 72,
            }}
          >
            {!!petInfo.helloMessage ? (
              <Text style={[TYPOS.body1, { color: Color.black }]}>
                {petInfo.helloMessage}
              </Text>
            ) : (
              <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
                등록된 인사말이 없습니다.
              </Text>
            )}
          </View>
          <View style={{ marginTop: 16, gap: 16 }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}
            >
              <Text style={[TYPOS.body2, { color: Color.neutral1, width: 65 }]}>
                생년월일
              </Text>
              <Text style={[TYPOS.body1, { color: Color.black, flex: 1 }]}>
                {dayjs(petInfo.birthday).format('YYYY. MM. DD')}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}
            >
              <Text style={[TYPOS.body2, { color: Color.neutral1, width: 65 }]}>
                중성화 여부
              </Text>
              <Text style={[TYPOS.body1, { color: Color.black, flex: 1 }]}>
                {petInfo.neuteredStatus}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}
            >
              <Text style={[TYPOS.body2, { color: Color.neutral1, width: 65 }]}>
                몸무게
              </Text>
              <Text style={[TYPOS.body1, { color: Color.black, flex: 1 }]}>
                {petInfo.weight} kg
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}
            >
              <Text style={[TYPOS.body2, { color: Color.neutral1, width: 65 }]}>
                특이사항
              </Text>
              <Text style={[TYPOS.body1, { color: Color.black, flex: 1 }]}>
                {petInfo.unusualCondition || '-'}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: Color.neutral4,
              marginVertical: 24,
            }}
          />
          {!!petInfo.otherPets && (
            <>
              <Text
                style={[
                  TYPOS.headline2,
                  { color: Color.black, marginBottom: 16 },
                ]}
              >
                더보기
              </Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                  gap: 16,
                }}
              >
                {petInfo.otherPets.map((pet) => (
                  <PetItem {...pet} key={pet.id} />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </ScrollContainer>
    </>
  );
};

export default PetDetail;
