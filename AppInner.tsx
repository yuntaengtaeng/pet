import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/navigation';

import Onboarding from './src/screens/Onboarding';
import AddressRegistration from './src/screens/auth/AddressRegistration';
import KaKaoLogin from './src/screens/auth/KaKaoLogin';
import FillProfile from './src/screens/auth/FillProfile';
import BottomNavigation from './src/screens/BottomNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppInner = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppInner;
