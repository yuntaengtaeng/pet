import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, TabNavigatorParamList } from '../types/navigation';
import * as BottomTab from './bottomTab/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Color from '../constants/color';
import TYPOS from '../components/ui/typo';

import Home24 from '../components/ui/icons/Home24';
import User24 from '../components/ui/icons/User24';
import Users24 from '../components/ui/icons/Users24';
import Chat24 from '../components/ui/icons/Chat24';

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
                <Home24 color={focused ? Color.neutral1 : Color.neutral3} />
              );
            case 'PetMate':
              return (
                <Users24 color={focused ? Color.neutral1 : Color.neutral3} />
              );
            case 'Chatting':
              return (
                <Chat24 color={focused ? Color.neutral1 : Color.neutral3} />
              );
            case 'MyPet':
              return (
                <User24 color={focused ? Color.neutral1 : Color.neutral3} />
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
        name="PetMate"
        component={BottomTab.PetMate}
        options={{ headerShown: false, tabBarLabel: '펫메이트' }}
      />
      <Tab.Screen
        name="Chatting"
        component={BottomTab.Chatting}
        options={{ headerShown: false, tabBarLabel: '채팅' }}
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
