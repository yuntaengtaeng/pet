import type { Meta, StoryObj } from '@storybook/react';

import Loading from './Loading';

const meta = {
  title: 'Design System/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingBase: Story = {
  args: {},
};
