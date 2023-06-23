import type { Meta, StoryObj } from '@storybook/react';

import ProductCard from './ProductCard';

const meta = {
  title: 'UI/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductCardBase: Story = {
  args: {
    id: '649193f013a61cf6c63e75cd',
    title: '중고거래test5',
    price: '10,000',
    timeDelta: '지난 주',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
    address: '관산동',
    salesStatus: '판매중',
    likeCount: 0,
    chatCount: 0,
  },
};
