import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { RootStackParamList } from '../../types/navigation';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Container from '../../components/layout/Container';
import TYPOS from '../../components/ui/typo';
import AppBar from '../../components/ui/AppBar';
import InputField from '../../components/ui/inputs/InputField';
import Button from '../../components/ui/buttons/Button';
import UiCheckbox from '../../components/ui/UiCheckbox';
import Color from '../../constants/color';
import Camera from '../../components/ui/icons/Camera';

export type FillProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'FillProfile'
>;

const FillProfile = ({ navigation, route }: FillProfileScreenProps) => {
  const [nickname, setNickname] = useState<string>('');
  const [selectedPetType, setSelectedPetType] = useState<string>('');

  const onSubmit = () => {
    const body = {
      nickname,
      selectedPetType,
    };

    console.log(body);
    navigation.reset({ routes: [{ name: 'BottomNavigation' }] });
  };

  return (
    <>
      <AppBar />
      <Container style={{ paddingHorizontal: 16 }}>
        <Text style={TYPOS.headline1}>프로필을 완성해주세요.</Text>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 32,
          }}
        >
          <View style={{ position: 'relative' }}>
            <Image
              style={{ width: 80, height: 80 }}
              source={require('../../../assets/img/placeholder.png')}
            />
            <Camera
              style={{ position: 'absolute', bottom: 0, right: 0 }}
              width={24}
              height={24}
            />
          </View>
        </View>
        <View>
          <InputField
            placeholder="닉네임"
            value={nickname}
            onChangeHandler={(value: string) => {
              setNickname(value);
            }}
          />
        </View>
        <View>
          <Text
            style={[
              TYPOS.headline4,
              {
                marginTop: 56,
                marginBottom: 24,
              },
            ]}
          >
            키우고 있는 반려동물을 선택해주세요
          </Text>
          <View style={styles.cardContainer}>
            <Pressable
              style={[
                styles.card,
                {
                  ...(selectedPetType === '강아지' && {
                    borderColor: Color.primary600,
                  }),
                },
              ]}
              onPress={() => {
                setSelectedPetType('강아지');
              }}
            >
              <Text>🐶</Text>
              <Text style={TYPOS.body1}>강아지</Text>
            </Pressable>
            <Pressable
              style={[
                styles.card,
                {
                  ...(selectedPetType === '고양이' && {
                    borderColor: Color.primary600,
                  }),
                },
              ]}
              onPress={() => {
                setSelectedPetType('고양이');
              }}
            >
              <Text>😺</Text>
              <Text style={TYPOS.body1}>고양이</Text>
            </Pressable>
          </View>
          <UiCheckbox isChecked={false}>
            <Text style={TYPOS.body2}>반려동물을 키우고 있지 않아요.</Text>
          </UiCheckbox>
        </View>
      </Container>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Button label="확인" buttonType="primary" onPressHandler={onSubmit} />
      </View>
    </>
  );
};
export default FillProfile;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    height: 100,
    width: '48%',
    borderWidth: 1,
    borderColor: Color.neutral4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
