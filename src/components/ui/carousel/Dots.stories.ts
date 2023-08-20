import type { Meta, StoryObj } from '@storybook/react';

import Dots from './Dots';

const meta = {
  title: 'ui/Carousel/Dots',
  component: Dots,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Dots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DotsBase: Story = {
  args: {
    length: 3,
    selectedPage: 1,
  },
};
