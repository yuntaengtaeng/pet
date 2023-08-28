import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

import MenuBackdrop from './MenuBackdrop';

const meta = {
  title: 'Design System/MenuBackdrop',
  component: MenuBackdrop,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MenuBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuBackdropExample: Story = {
  args: {
    children: (
      <View>
        <Text>children</Text>
      </View>
    ),
    isVisible: true,
    close: () => {},
    menuStyle: {
      width: 120,
      height: 120,
    },
  },
};
