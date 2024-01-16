import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Container from '../components/layout/Container';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TYPOS from '../components/ui/typo';

export type OnboardingScreenProps = StackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

const Onboarding = ({ navigation, route }: OnboardingScreenProps) => {
  const loginWithKakao = async () => {
    navigation.push('KaKaoLogin');
  };

  return (
    <Container>
      <Image
        style={styles.img}
        source={require('../../assets/img/onBoarding.png')}
      />
      <View style={styles.guide}>
        <Text style={[TYPOS.headline1]}>우리동네 펫 월드에</Text>
        <Text style={[TYPOS.headline1]}>오신 걸 환영합니다!</Text>
      </View>
      <TouchableOpacity style={styles.kakaoLogin} onPress={loginWithKakao}>
        <Image
          style={styles.kakaoLogo}
          source={require('../../assets/img/kakao.png')}
        />
        <Text style={[TYPOS.headline1]}>카카오로 시작하기</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width,
  },
  guide: {
    marginTop: 64,
    marginBottom: 48,
    alignItems: 'center',
  },
  kakaoLogo: {
    marginRight: 16,
  },
  kakaoLogin: {
    backgroundColor: '#FEE500',
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    flexDirection: 'row',
  },
});
