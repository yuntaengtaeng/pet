import type { Meta, StoryObj } from '@storybook/react';

import ListValue from './ListValue';

const meta = {
  title: 'Design System/ListValue',
  component: ListValue,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ListValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListValueBase: Story = {
  args: {
    label: 'label1',
  },
};

export const IsActiveListValue: Story = {
  args: {
    label: 'label2',
    isActive: true,
  },
};

export const DisabledListValue: Story = {
  args: {
    label: 'label2',
    disabled: true,
  },
};
