import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Bell16 from './Bell16';
import Camera16 from './Camera16';
import Chat16 from './Chat16';
import CircularSwap16 from './CircularSwap16';
import Check16 from './Check16';
import Close16 from './Close16';
import Down16 from './Down16';
import Eye16 from './Eye16';
import Favorite16 from './Favorite16';
import Right16 from './Right16';
import RoundClose16 from './RoundClose16';
import Swap16 from './Swap16';
import Up16 from './Up16';
import Plus16 from './Plus16';
import Dog16 from './Dog16';
import Left16 from './Left16';

import Close20 from './Close20';

import Bell24 from './Bell24';
import Burger24 from './Burger24';
import Calendar24 from './Calendar24';
import Camera24 from './Camera24';
import Chat24 from './Chat24';
import Check24 from './Check24';
import CircularSwap24 from './CircularSwap24';
import Close24 from './Close24';
import Document24_2 from './Document24_2';
import Document24 from './Document24';
import Down24 from './Down24';
import Eye24 from './Eye24';
import Favorite24 from './Favorite24';
import FillPin24 from './FillPin24';
import Filter24 from './Filter24';
import Home24 from './Home24';
import Image24 from './Image24';
import Left24 from './Left24';
import Location24 from './Location24';
import Minus24 from './Minus24';
import Pin24 from './Pin24';
import Plus24 from './Plus24';
import Right24 from './Right24';
import Search24 from './Search24';
import Send24 from './Send24';
import Share24 from './Share24';
import Swap24 from './Swap24';
import Up24 from './Up24';
import User24 from './User24';
import Users24 from './Users24';
import Won24 from './Won24';
import Settings24 from './Settings24';
import Kakao24 from './Kakao24';
import Time24 from './Time24';
import Dog24 from './Dog24';

import Camera32 from './Camera32';
import Favorite32 from './Favorite32';
import Image32 from './Image32';
import Plus32 from './Plus32';
import FillFavorite32 from './FillFavorite32';
import Walk32 from './Walk32';

import PinIndicator from './PinIndicator';

import Color from '../../../constants/color';

import { View, Text } from 'react-native';

const meta = {
  title: 'Design System/Icons',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const ArrowsAndDirections24 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Up24 color={Color.black} />
        <Text>Up24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Down24 color={Color.black} />
        <Text>Down24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Right24 color={Color.black} />
        <Text>Right24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Left24 color={Color.black} />
        <Text>Left24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Swap24 color={Color.black} />
        <Text>Swap24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <CircularSwap24 color={Color.black} />
        <Text>CircularSwap24</Text>
      </View>
    </View>
  );
};

export const ArrowsAndDirections16 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <CircularSwap16 color={Color.black} />
        <Text>CircularSwap16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Right16 color={Color.black} />
        <Text>Right16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Left16 color={Color.black} />
        <Text>Left16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Up16 color={Color.black} />
        <Text>Up16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Down16 color={Color.black} />
        <Text>Down16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Swap16 color={Color.black} />
        <Text>Swap16</Text>
      </View>
    </View>
  );
};

export const UserInterface24 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Minus24 color={Color.black} />
        <Text>Minus24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Plus24 color={Color.black} />
        <Text>Plus24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Check24 color={Color.black} />
        <Text>Check24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Close24 color={Color.black} />
        <Text>Close24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Burger24 color={Color.black} />
        <Text>Burger24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Search24 color={Color.black} />
        <Text>Search24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Document24 color={Color.black} />
        <Text>Document24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Document24_2 color={Color.black} />
        <Text>Document24_2</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Filter24 color={Color.black} />
        <Text>Filter24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Camera24 color={Color.black} />
        <Text>Camera24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Location24 color={Color.black} />
        <Text>Location24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Bell24 color={Color.black} />
        <Text>Bell24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Home24 color={Color.black} />
        <Text>Home24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <User24 color={Color.black} />
        <Text>User24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Users24 color={Color.black} />
        <Text>Users24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Favorite24 color={Color.black} />
        <Text>Favorite24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Chat24 color={Color.black} />
        <Text>Chat24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Eye24 color={Color.black} />
        <Text>Eye24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Share24 color={Color.black} />
        <Text>Share24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Won24 color={Color.black} />
        <Text>Won24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Pin24 color={Color.black} />
        <Text>Pin24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <FillPin24 color={Color.black} />
        <Text>FillPin24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Image24 color={Color.black} />
        <Text>Image24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Send24 color={Color.black} />
        <Text>Send24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Settings24 color={Color.black} />
        <Text>Settings24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Kakao24 />
        <Text>Kakao24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Calendar24 color={Color.black} />
        <Text>Calendar24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Dog24 color={Color.black} />
        <Text>Dog24</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Time24 color={Color.black} />
        <Text>Time24</Text>
      </View>
    </View>
  );
};

export const UserInterface20 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Close20 color={Color.black} />
        <Text>Close20</Text>
      </View>
    </View>
  );
};

export const UserInterface16 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Camera16 color={Color.black} />
        <Text>Camera16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Check16 color={Color.black} />
        <Text>Check16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Close16 color={Color.black} />
        <Text>Close16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <RoundClose16 color={Color.black} />
        <Text>RoundClose16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Bell16 color={Color.black} />
        <Text>Bell16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Favorite16 color={Color.black} />
        <Text>Favorite16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Chat16 color={Color.black} />
        <Text>Chat16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Eye16 color={Color.black} />
        <Text>Eye16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Dog16 color={Color.black} />
        <Text>Dog16</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Plus16 color={Color.black} />
        <Text>Plus16</Text>
      </View>
    </View>
  );
};

export const UserInterface32 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Plus32 color={Color.black} />
        <Text>Plus32</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Walk32 color={Color.black} />
        <Text>Walk32</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Image32 color={Color.black} />
        <Text>Image32</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Favorite32 color={Color.black} />
        <Text>Favorite32</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <FillFavorite32 color={Color.black} />
        <Text>FillFavorite32</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Camera32 color={Color.black} />
        <Text>Camera32</Text>
      </View>
    </View>
  );
};

export const Etc = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <PinIndicator color={Color.black} />
        <Text>PinIndicator</Text>
      </View>
    </View>
  );
};
