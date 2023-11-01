import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsExample: Story = {
  args: {
    menu: ['메뉴1', '메뉴2'],
    selectedIndex: 0,
    onSelectHandler: () => {},
  },
};
