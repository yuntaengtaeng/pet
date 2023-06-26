import type { Meta, StoryObj } from '@storybook/react';

import AddressLabel from './AddressLabel';

const meta = {
  title: 'ui/AddressLabel',
  component: AddressLabel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AddressLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddressLabelDefault: Story = {
  args: {
    address: '강남구 삼성동',
  },
};

export const IsSelectedAddressLabel: Story = {
  args: {
    address: '강남구 삼성동',
    isSelected: true,
  },
};
