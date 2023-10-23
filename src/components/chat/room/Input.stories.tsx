import type { Meta, StoryObj } from '@storybook/react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import Input from './Input';
import React from 'react';

const meta = {
  title: 'ui/chatroom/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductInformationExample: Story = {
  args: {
    blockStatus: 'None',
  },
};
