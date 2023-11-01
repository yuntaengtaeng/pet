import type { Meta, StoryObj } from '@storybook/react';

import Selectable from './Selectable';

const meta = {
  title: 'UI/Selectable',
  component: Selectable,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Selectable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectableExample: Story = {
  args: {
    value: 'value',
  },
};
