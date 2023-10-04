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

const dummy_data = [
  {
    id: '123',
    name: '연탄이',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
    petType: '고양이',
  },
  {
    id: '1234',
    name: '숯불이',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
    petType: '강아지',
  },
  {
    id: '12345',
    name: '재떨이',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
    petType: '강아지',
  },
];

const PetInfo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const overlay = useOverlay();

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
        {dummy_data.map((v) => (
          <Pressable
            style={{
              width: 156,
              height: 88,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Color.primary700,
              borderRadius: 5,
            }}
          >
            <Image
              style={{ width: 56, height: 56, borderRadius: 56 }}
              source={require('../../../assets/img/placeholder.png')}
            />
            <View>
              <Text style={[TYPOS.headline4, { color: Color.black }]}>
                {v.name}
              </Text>
              <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
                {v.petType}
              </Text>
            </View>
          </Pressable>
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
            }}
          />
          <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>추가하기</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default PetInfo;
