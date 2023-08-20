import type { Meta, StoryObj } from '@storybook/react';

import UiSwitch from './UiSwitch';

const meta = {
  title: 'Design System/UiSwitch',
  component: UiSwitch,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UiSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UiSwitchBase: Story = {
  args: {
    isOn: false,
  },
};

export const UiSwitchIsChecked: Story = {
  args: {
    isOn: true,
  },
};
