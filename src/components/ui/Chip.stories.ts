import type { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';

const meta = {
  title: 'Design System/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChipDefault: Story = {
  args: {
    label: 'Chip',
  },
};

export const IsActiveChip: Story = {
  args: {
    label: 'Chip',
    isActive: true,
  },
};
