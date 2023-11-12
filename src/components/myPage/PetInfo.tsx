import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, Pressable, View, Text, Image } from 'react-native';
import Color from '../../constants/color';
import useOverlay from '../../hooks/overlay/useOverlay';
import { PetType } from '../../types/interface';
import { RootStackParamList } from '../../types/navigation';
import BottomSheet from '../ui/BottomSheet';
import Right24 from '../ui/icons/Right24';
import TYPOS from '../ui/typo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Plus16 from '../ui/icons/Plus16';
import { Pet } from '../../types/interface';
import PetItem from '../ui/PetItem';

const PetInfo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const overlay = useOverlay();
  const [pets, setPets] = useState<Pet[]>([]);

  const fetch = async () => {
    try {
      const { data } = await axios.get<{ pets: Pet[] }>('/my-page/pets');
      setPets(data.pets);
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetch();
  }, []);

  const moveAddPet = (type: PetType) => {
    navigation.navigate('AddPet', {
      type,
    });
  };

  const openBottomSheet = () => {
    overlay.open(
      <BottomSheet
        isOpened={true}
        onClose={() => {
          overlay.close();
        }}
        height={225}
        title="반려동물 추가"
      >
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Pressable
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              moveAddPet('cat');
              overlay.close();
            }}
          >
            <Text style={[TYPOS.body1, { color: Color.black }]}>고양이</Text>
            <Right24 color={Color.neutral1} />
          </Pressable>
          <Pressable
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              moveAddPet('dog');
              overlay.close();
            }}
          >
            <Text style={[TYPOS.body1, { color: Color.black }]}>강아지</Text>
            <Right24 color={Color.neutral1} />
          </Pressable>
        </View>
      </BottomSheet>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <Text
        style={[
          TYPOS.headline4,
          { color: Color.black, marginTop: 24, marginBottom: 16 },
        ]}
      >
        반려동물 정보
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          gap: 16,
        }}
      >
        {pets.map((pet) => (
          <PetItem {...pet} key={pet.id} />
        ))}
        <Pressable
          style={{
            width: 156,
            height: 88,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: Color.neutral4,
            borderRadius: 5,
          }}
          onPress={() => {
            openBottomSheet();
          }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 16,
              backgroundColor: Color.neutral4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus16 color={Color.neutral2} />
          </View>
          <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>추가하기</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default PetInfo;
