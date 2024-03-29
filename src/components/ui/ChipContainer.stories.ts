import type { Meta, StoryObj } from '@storybook/react';

import { ChipContainerView } from './ChipContainer';

const meta = {
  title: 'ui/ChipContainer',
  component: ChipContainerView,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ChipContainerView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleChipContainer: Story = {
  args: {
    labels: ['Chip1', 'Chip2', 'Chip3'],
    type: 'single',
    selectedLabel: 'Chip1',
  },
};

export const MultiChipContainer: Story = {
  args: {
    labels: ['Chip1', 'Chip2', 'Chip3'],
    type: 'multi',
    selectedLabel: ['Chip1', 'Chip3'],
  },
};
