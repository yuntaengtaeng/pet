import type { Meta, StoryObj } from '@storybook/react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import PetItem from './PetItem';
import React from 'react';

const meta = {
  title: 'UI/PetItem',
  component: PetItem,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} satisfies Meta<typeof PetItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PetItemExample: Story = {
  args: {
    name: '똘이',
    type: '고양이',
    id: 'TEST',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
  },
};

export const PetItemNoImageExample: Story = {
  args: {
    name: '똘이',
    type: '고양이',
    id: 'TEST',
  },
};
