import React, { useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios, { AxiosError } from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/ui/Header';

export type KaKaoLoginScreenProps = StackScreenProps<
  RootStackParamList,
  'KaKaoLogin'
>;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KaKaoLogin = ({ navigation, route }: KaKaoLoginScreenProps) => {
  const requestToken = async (code: string) => {
    try {
      const request_token_url = 'https://kauth.kakao.com/oauth/token';

      const value = await axios({
        method: 'post',
        url: request_token_url,
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.REST_API_KEY,
          redirect_uri: process.env.REDIRECT_URI,
          code,
        },
      });

      console.log(value.data);

      const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${value.data.access_token}`,
        },
      });

      console.log(result.data);
      /*
        API 요청 후 페이지 이동 분기 처리 필요
      */
      navigation.replace('AddressRegistration');
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

  //TEST를 위해 임시 작성 코드
  useEffect(() => {
    navigation.replace('AddressRegistration');
  }, []);

  return (
    <>
      <Header title="카카오계정으로 로그인" />
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}`,
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
