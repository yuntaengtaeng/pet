import type { Meta, StoryObj } from '@storybook/react';

import AppointmentCancelMessage from './AppointmentCancelMessage';

const meta = {
  title: 'ui/AppointmentCancelMessage',
  component: AppointmentCancelMessage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AppointmentCancelMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppointmentCancelMessageExample: Story = {
  args: {
    content: 'nickname',
  },
};
