import type { Meta, StoryObj } from '@storybook/react';

import BirthdayPicker from './BirthdayPicker';

const meta = {
  title: 'ui/BirthdayPicker',
  component: BirthdayPicker,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BirthdayPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BirthdayPickerExample: Story = {
  args: {
    onDateChange: () => {},
    itemHeight: 44,
  },
};
