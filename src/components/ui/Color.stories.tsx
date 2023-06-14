import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Color from '../../constants/color';

const meta = {
  title: 'Design System/Color',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Black = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.black }}
  ></View>
);

export const Neutral1 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.neutral1 }}
  ></View>
);

export const Neutral2 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.neutral2 }}
  ></View>
);

export const Neutral3 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.neutral3 }}
  ></View>
);

export const Neutral4 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.neutral4 }}
  ></View>
);

export const Neutral5 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.neutral5 }}
  ></View>
);

export const White = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.white }}
  ></View>
);

export const Primary900 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary900 }}
  ></View>
);

export const Primary800 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary800 }}
  ></View>
);

export const Primary700 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary700 }}
  ></View>
);

export const Primary600 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary600 }}
  ></View>
);

export const Primary500 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary500 }}
  ></View>
);

export const Primary400 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary400 }}
  ></View>
);

export const Primary300 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary300 }}
  ></View>
);

export const Primary200 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary200 }}
  ></View>
);

export const Primary100 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary100 }}
  ></View>
);

export const Primary50 = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.primary50 }}
  ></View>
);

export const Success = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.success }}
  ></View>
);

export const SuccessBg = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.successBg }}
  ></View>
);

export const Warning = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.warning }}
  ></View>
);

export const WarningBg = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.warningBg }}
  ></View>
);

export const Info = () => (
  <View style={{ width: 100, height: 100, backgroundColor: Color.info }}></View>
);

export const InfoBg = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.infoBg }}
  ></View>
);

export const Error = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.error }}
  ></View>
);

export const ErrorBg = () => (
  <View
    style={{ width: 100, height: 100, backgroundColor: Color.errorBg }}
  ></View>
);
