import type { Meta, StoryObj } from '@storybook/react';

import MateRequestCard from './MateRequestCard';
const meta = {
  title: 'UI/MateRequestCard',
  component: MateRequestCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MateRequestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MateRequestCardExample: Story = {
  args: {
    message: 'message',
    name: '기영맘',
    pets: [
      {
        id: 'id',
        name: 'name',
        type: '강아지',
      },
    ],
  },
};
