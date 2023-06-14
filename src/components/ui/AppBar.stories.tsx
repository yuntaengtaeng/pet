import type { Meta, StoryObj } from '@storybook/react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import AppBar from './AppBar';
import React from 'react';

const meta = {
  title: 'Design System/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppBarBase: Story = {
  args: {
    title: 'title',
  },
};
