import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios, { AxiosError } from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/ui/Header';
import { User } from '../../types/interface';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../../store/atoms';

export type KaKaoLoginScreenProps = StackScreenProps<
  RootStackParamList,
  'KaKaoLogin'
>;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KaKaoLogin = ({ navigation, route }: KaKaoLoginScreenProps) => {
  const redirectUri = `${process.env.API_URL}/web/kakao`;
  const setUser = useSetRecoilState(UserState);

  const requestToken = async (code: string) => {
    try {
      const request_token_url = 'https://kauth.kakao.com/oauth/token';

      const value = await axios({
        method: 'post',
        url: request_token_url,
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.REST_API_KEY,
          redirect_uri: redirectUri,
          code,
        },
      });

      const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${value.data.access_token}`,
        },
      });

      const email = result.data.kakao_account.email;

      const response = await axios.post('/auth/login', {
        email,
      });

      /*
      response status guide
      - 200 : 기존 회원
      - 202 : 신규 가입자
      */

      if (response.status === 200) {
        const user: User = response.data.data;
        setUser(user);
        navigation.reset({ routes: [{ name: 'BottomNavigation' }] });
      } else if (response.status === 202) {
        navigation.replace('AddressRegistration', { email });
      }
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.log(errorResponse);
    }
  };

  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };

  return (
    <>
      <Header title="카카오계정으로 로그인" />
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REST_API_KEY}&redirect_uri=${redirectUri}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            getCode(data);
          }}
        />
      </View>
    </>
  );
};

export default KaKaoLogin;
