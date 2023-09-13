import type { Meta, StoryObj } from '@storybook/react';

import BottomSheet from './BottomSheet';
import { View } from 'react-native';

const meta = {
  title: 'Design System/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomSheetExample: Story = {
  args: {
    children: <View></View>,
    isOpened: false,
    onClose: () => {},
    height: 300,
    title: 'title',
  },
};
