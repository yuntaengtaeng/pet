import type { Meta, StoryObj } from '@storybook/react';

import TextIconButton from './TextIconButton';

const meta = {
  title: 'Design System/TextIconButton',
  component: TextIconButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextIconButton>;

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
