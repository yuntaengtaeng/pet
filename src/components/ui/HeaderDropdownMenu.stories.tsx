import type { Meta, StoryObj } from '@storybook/react';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import Burger24 from './icons/Burger24';
import Color from '../../constants/color';

const meta = {
  title: 'ui/HeaderDropdownMenu',
  component: HeaderDropdownMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof HeaderDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderDropdownMenuExample: Story = {
  args: {
    iconContainerStyle: {
      alignItems: 'flex-end',
    },
    icon: <Burger24 color={Color.black} />,
    menus: [
      {
        label: 'label1',
      },
      {
        label: 'label2',
      },
    ],
  },
};
