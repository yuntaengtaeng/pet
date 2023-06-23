import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './Dropdown';

const meta = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownBase: Story = {
  args: {
    list: ['label1', 'label2', 'label3', 'label4'],
    selectedLabel: 'label2',
  },
};

export const DisabledDropdownBase: Story = {
  args: {
    list: ['label1', 'label2', 'label3', 'label4'],
    selectedLabel: 'label2',
    disabled: true,
  },
};
