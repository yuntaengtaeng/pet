import type { Meta, StoryObj } from '@storybook/react';

import TimePicker from './TimePicker';

const meta = {
  title: 'UI/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TimePickerExample: Story = {
  args: {
    onTimeChange: () => {},
    itemHeight: 44,
  },
};
