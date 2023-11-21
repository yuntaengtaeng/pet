import type { Meta, StoryObj } from '@storybook/react';

import PetLabel from './PetLabel';

const meta = {
  title: 'UI/PetLabel',
  component: PetLabel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PetLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PetLabelExample: Story = {
  args: {
    onPressHandler: () => {},
    isChecked: false,
    pet: {
      type: '강아지',
      name: '강쥐',
      id: '1',
    },
  },
};
