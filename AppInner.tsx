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
import AppointmentScheduler from './src/screens/AppointmentScheduler';
import AddPet from './src/screens/myPage/AddPet';
import TradeConfirmation from './src/screens/TradeConfirmation';
import ModifyProfile from './src/screens/myPage/ModifyProfile';
import PetDetail from './src/screens/myPage/PetDetail';
import ProductChatting from './src/screens/ProductChatting';
import ModifyPet from './src/screens/myPage/ModifyPet';
import AddPetMate from './src/screens/AddPetMate';
import PetMateDetail from './src/screens/PetMateDetail';
import ApplyPetMate from './src/screens/ApplyPetMate';
import MyMate from './src/screens/MyMate';
import PetMateRequestList from './src/screens/PetMateRequestList';

axios.defaults.baseURL = process.env.API_URL;

const Stack = createStackNavigator<RootStackParamList>();

const AppInner = () => {
  const isLoading = useRecoilValue(LoadingState);
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (user.accessToken && config.url !== '/token/refresh-token') {
        config.headers.Authorization = `${user.accessToken}`;
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
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
                    authorization: `${refreshToken}`,
                  },
                }
              );
              setUser((prev) => ({ ...prev, accessToken: data.accessToken }));
              //419 요청에 실패했던 요청 새로운 토큰으로 재요청
              originalRequest.headers.authorization = `${data.accessToken}`;
              return axios(originalRequest);
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      // 컴포넌트가 언마운트될 때 인터셉터 제거
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
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
            <Stack.Screen
              name="AppointmentScheduler"
              component={AppointmentScheduler}
            />
            <Stack.Screen name="AddPet" component={AddPet} />
            <Stack.Screen
              name="TradeConfirmation"
              component={TradeConfirmation}
            />
            <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
            <Stack.Screen name="PetDetail" component={PetDetail} />
            <Stack.Screen name="ProductChatting" component={ProductChatting} />
            <Stack.Screen name="ModifyPet" component={ModifyPet} />
            <Stack.Screen name="AddPetMate" component={AddPetMate} />
            <Stack.Screen name="PetMateDetail" component={PetMateDetail} />
            <Stack.Screen
              name="PetMateRequestList"
              component={PetMateRequestList}
            />
            <Stack.Screen name="ApplyPetMate" component={ApplyPetMate} />
            <Stack.Screen name="MyMate" component={MyMate} />
            <Stack.Screen name="UpcomingWalk" component={UpcomingWalk} />
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
