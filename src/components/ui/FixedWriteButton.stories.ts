import type { Meta, StoryObj } from '@storybook/react';

import FixedWriteButton from './FixedWriteButton';

const meta = {
  title: 'ui/FixedWriteButton',
  component: FixedWriteButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof FixedWriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FixedWriteButtonExample: Story = {
  args: {},
};
