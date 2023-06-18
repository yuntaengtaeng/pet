import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import SHADOWS from '.';
import TYPOS from '../typo';
import Color from '../../../constants/color';

const meta = {
  title: 'Design System/Shadow',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Shadow4 = () => (
  <View>
    <View
      style={[
        { width: 100, height: 100, backgroundColor: Color.white },
        SHADOWS.shadow4,
      ]}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>Shadow4</Text>
  </View>
);
Shadow4.storyName = 'shadow4';
