import type { Meta, StoryObj } from '@storybook/react';

import VerticalProductCard from './VerticalProductCard';

const meta = {
  title: 'UI/VerticalProductCard',
  component: VerticalProductCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof VerticalProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalProductCardDefault: Story = {
  args: {
    title: '중고거래test5',
    price: '10,000원',
    image:
      'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
  },
};
