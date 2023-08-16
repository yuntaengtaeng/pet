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
import ProductDetail from './src/screens/ProductDetail';

import Loading from './src/components/ui/Loading';
import { LoadingState, UserState } from './src/store/atoms';

import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import UserProductList from './src/screens/UserProductList';
import ModifyProduct from './src/screens/ModifyProduct';
import ChatRoom from './src/screens/ChatRoom';
import Color from './src/constants/color';

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
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: Color.white,
              },
            }}
          >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
            <Stack.Screen
              name="AddressRegistration"
              component={AddressRegistration}
            />
            <Stack.Screen name="FillProfile" component={FillProfile} />
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
            />
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
            <Stack.Screen name="AddressModify" component={AddressModify} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="UserProductList" component={UserProductList} />
            <Stack.Screen name="ModifyProduct" component={ModifyProduct} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
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
