import type { Meta, StoryObj } from '@storybook/react';

import AppointmentNotification from './AppointmentNotification';

const meta = {
  title: 'ui/chatroom/AppointmentNotification',
  component: AppointmentNotification,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AppointmentNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppointmentNotificationExample: Story = {
  args: {
    timestamp: '8.25 (금) 오후 6:30',
  },
};
