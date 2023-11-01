import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';

const meta = {
  title: 'UI/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagSuccessExample: Story = {
  args: {
    label: 'Tag',
    theme: 'success',
  },
};

export const TagWarningExample: Story = {
  args: {
    label: 'Tag',
    theme: 'warning',
  },
};
