import type { Meta, StoryObj } from '@storybook/react';

import RadioButtonGroup from './RadioButtonGroup';
import RadioButtonItem from './RadioButtonItem';
import { Text } from 'react-native';

const meta = {
  title: 'Design System/RadioButton',
  component: RadioButtonGroup,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButton: Story = {
  args: {
    selected: 'item1',
    children: (
      <>
        <RadioButtonItem value="item1">
          <Text>item1</Text>
        </RadioButtonItem>
        <RadioButtonItem value="item2">
          <Text>item2</Text>
        </RadioButtonItem>
        <RadioButtonItem value="item3">
          <Text>item3</Text>
        </RadioButtonItem>
      </>
    ),
  },
};

export const RadioButtonItemExample = () => (
  <RadioButtonItem value="">
    <Text>item1</Text>
  </RadioButtonItem>
);

export const SelectedRadioButtonItem = () => (
  <RadioButtonGroup selected="item1">
    <RadioButtonItem value="item1">
      <Text>item1</Text>
    </RadioButtonItem>
  </RadioButtonGroup>
);

export const DisabledRadioButtonItem = () => (
  <RadioButtonItem value="item1" disabled>
    <Text>item1</Text>
  </RadioButtonItem>
);

export const SelectedDisabledRadioButtonItem = () => (
  <RadioButtonGroup selected="item1">
    <RadioButtonItem value="item1" disabled>
      <Text>item1</Text>
    </RadioButtonItem>
  </RadioButtonGroup>
);
