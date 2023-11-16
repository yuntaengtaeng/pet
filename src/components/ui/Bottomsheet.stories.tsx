import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from './BottomSheet';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta = {
  title: 'Design System/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
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
