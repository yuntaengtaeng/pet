import type { Meta, StoryObj } from '@storybook/react';

import WheelPicker from './WheelPicker';

const meta = {
  title: 'UI/WheelPicker',
  component: WheelPicker,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof WheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WheelPickerExample: Story = {
  args: {
    items: ['apple', 'banana', 'orange'],
    onItemChange: () => {},
    itemHeight: 44,
  },
};
