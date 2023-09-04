import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calender';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalendarExample: Story = {
  args: {
    selectedDate: '',
  },
};
