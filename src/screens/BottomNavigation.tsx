import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, TabNavigatorParamList } from '../types/navigation';
import * as BottomTab from './bottomTab/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Color from '../constants/color';
import TYPOS from '../components/ui/typo';

import Search from '../components/ui/icons/Search';
import Location from '../components/ui/icons/Location';
import User from '../components/ui/icons/User';
import Users from '../components/ui/icons/Users';

export type MainScreenProps = StackScreenProps<
  RootStackParamList,
  'BottomNavigation'
>;

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: Color.neutral3,
        tabBarActiveTintColor: Color.neutral1,
        tabBarLabelStyle: {
          ...TYPOS.body2,
        },
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <Search
                  size={24}
                  color={focused ? Color.neutral1 : Color.neutral1}
                />
              );
            case 'PetVillage':
              return (
                <Location
                  size={24}
                  color={focused ? Color.neutral1 : Color.neutral1}
                />
              );
            case 'PetMate':
              return (
                <Users
                  size={24}
                  color={focused ? Color.neutral1 : Color.neutral1}
                />
              );
            case 'MyPet':
              return (
                <User
                  size={24}
                  color={focused ? Color.neutral1 : Color.neutral1}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={BottomTab.Home}
        options={{ headerShown: false, tabBarLabel: '홈' }}
      />
      <Tab.Screen
        name="PetVillage"
        component={BottomTab.PetVillage}
        options={{ headerShown: false, tabBarLabel: '펫빌리지' }}
      />
      <Tab.Screen
        name="PetMate"
        component={BottomTab.PetMate}
        options={{ headerShown: false, tabBarLabel: '펫메이트' }}
      />
      <Tab.Screen
        name="MyPet"
        component={BottomTab.MyPet}
        options={{ headerShown: false, tabBarLabel: '마이펫' }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
