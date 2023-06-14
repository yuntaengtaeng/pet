import type { Meta, StoryObj } from '@storybook/react';

import UiCheckbox from './UiCheckbox';

const meta = {
  title: 'Design System/Checkbox',
  component: UiCheckbox,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UiCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxBase: Story = {
  args: {
    isChecked: false,
  },
};

export const CheckboxIsChecked: Story = {
  args: {
    isChecked: true,
  },
};

export const CheckboxDisabled: Story = {
  args: {
    isChecked: false,
    disabled: true,
  },
};

export const CheckboxIsCheckedDisabled: Story = {
  args: {
    isChecked: true,
    disabled: true,
  },
};
