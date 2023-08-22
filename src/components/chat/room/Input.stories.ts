import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  title: 'ui/chatroom/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputExample: Story = {
  args: {},
};
