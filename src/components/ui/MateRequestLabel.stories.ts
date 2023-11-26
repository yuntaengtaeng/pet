import type { Meta, StoryObj } from '@storybook/react';

import MateRequestLabel from './MateRequestLabel';
const meta = {
  title: 'UI/MateRequestLabel',
  component: MateRequestLabel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MateRequestLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MateRequestLabelExample: Story = {
  args: {
    name: '기영맘',
    petCount: 3,
  },
};

export const MateRequestLabelHostExample: Story = {
  args: {
    name: '기영맘',
    petCount: 3,
    isHost: true,
  },
};
