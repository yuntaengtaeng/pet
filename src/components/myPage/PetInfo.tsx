import { ScrollView, Pressable, View, Text, Image } from 'react-native';
import Color from '../../constants/color';
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
      </ScrollView>
    </View>
  );
};

export default PetInfo;
