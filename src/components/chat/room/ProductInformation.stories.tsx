import type { Meta, StoryObj } from '@storybook/react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import ProductInformation from './ProductInformation';
import React from 'react';

const meta = {
  title: 'ui/chatroom/ProductInformation',
  component: ProductInformation,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} satisfies Meta<typeof ProductInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductInformationExample: Story = {
  args: {
    id: 'test',
    title: '강아지가 좋아하는 오리인형',
    price: '15,000원',
    status: '예약중',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
  },
};
