import type { Meta, StoryObj } from '@storybook/react';

import TextButton from './TextButton';

const meta = {
  title: 'Design System/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    buttonType: 'secondary',
  },
};
