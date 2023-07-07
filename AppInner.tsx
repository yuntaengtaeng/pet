import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/navigation';

import Onboarding from './src/screens/Onboarding';
import AddressRegistration from './src/screens/auth/AddressRegistration';
import KaKaoLogin from './src/screens/auth/KaKaoLogin';
import FillProfile from './src/screens/auth/FillProfile';
import BottomNavigation from './src/screens/BottomNavigation';
import Gallery from './src/screens/Gallery';
import Camera from './src/screens/Camera';
import EditProduct from './src/screens/EditProduct';
import AddressModify from './src/screens/AddressModify';

import Loading from './src/components/ui/Loading';
import { LoadingState, UserState } from './src/store/atoms';

import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';

axios.defaults.baseURL = process.env.API_URL;

const Stack = createStackNavigator<RootStackParamList>();

const AppInner = () => {
  const isLoading = useRecoilValue(LoadingState);
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (user.accessToken) {
        config.headers.Authorization = `${user.accessToken}`;
      }
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const type = error.response.data.type;
            if (type === 'refresh') {
              setUser({
                email: '',
                nickname: '',
                profileImage: '',
                petType: 'dog',
                address: '',
                accessToken: '',
                refreshToken: '',
              });

              //onBoarding 이동 로직 처리 추가
              return;
            } else if (type === 'access') {
              const originalRequest = config;
              const refreshToken = user.refreshToken;
              const {
                data: { data },
              } = await axios.post(
                '/token/refresh-token',
                {},
                {
                  headers: {
                    authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
                  },
                }
              );
              //새로운 토큰 저장

              setUser((prev) => ({ ...prev, accessToken: data.accessToken }));
              //419 요청에 실패했던 요청 새로운 토큰으로 재요청
              originalRequest.headers.authorization = `${process.env.REACT_APP_JWT_KEY} ${data.accessToken}`;
              return axios(originalRequest);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }, [user]);

  return (
    <>
      {isLoading && <Loading />}
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="KaKaoLogin"
              component={KaKaoLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddressRegistration"
              component={AddressRegistration}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FillProfile"
              component={FillProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Gallery"
              component={Gallery}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProduct}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddressModify"
              component={AddressModify}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppInner;
