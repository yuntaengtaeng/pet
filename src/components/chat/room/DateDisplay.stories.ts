import type { Meta, StoryObj } from '@storybook/react';

import DateDisplay from './DateDisplay';

const meta = {
  title: 'ui/chatroom/DateDisplay',
  component: DateDisplay,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DateDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddressLabelDefault: Story = {
  args: {
    timestamp: '2023년 2월 18일',
  },
};
