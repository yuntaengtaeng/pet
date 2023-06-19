import React from 'react';
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

import Loading from './src/components/ui/Loading';
import { LoadingState } from './src/store/atoms';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';

axios.defaults.baseURL = process.env.API_URL;

const Stack = createStackNavigator<RootStackParamList>();

const AppInner = () => {
  const isLoading = useRecoilValue(LoadingState);

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
