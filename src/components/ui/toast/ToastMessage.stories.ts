import type { Meta, StoryObj } from '@storybook/react';

import ToastMessage from './ToastMessage';

const meta = {
  title: 'ui/ToastMessage',
  component: ToastMessage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ToastMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastMessageDefault: Story = {
  args: {
    message: 'ToastMessage',
  },
};
