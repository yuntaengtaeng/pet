import type { Meta, StoryObj } from '@storybook/react';

import PetCard from './PetCard';

const meta = {
  title: 'UI/PetCard',
  component: PetCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PetCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PetCardExample: Story = {
  args: {
    type: 'DOG',
  },
};
