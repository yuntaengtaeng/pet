import type { Meta, StoryObj } from '@storybook/react';

import RadioButtonGroup from './RadioButtonGroup';
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
        <RadioButtonGroup.RadioButtonItem value="item1">
          <Text>item1</Text>
        </RadioButtonGroup.RadioButtonItem>
        <RadioButtonGroup.RadioButtonItem value="item2">
          <Text>item2</Text>
        </RadioButtonGroup.RadioButtonItem>
        <RadioButtonGroup.RadioButtonItem value="item3">
          <Text>item3</Text>
        </RadioButtonGroup.RadioButtonItem>
      </>
    ),
  },
};

export const RadioButtonItem = () => (
  <RadioButtonGroup.RadioButtonItem value="">
    <Text>item1</Text>
  </RadioButtonGroup.RadioButtonItem>
);

export const SelectedRadioButtonItem = () => (
  <RadioButtonGroup selected="item1">
    <RadioButtonGroup.RadioButtonItem value="item1">
      <Text>item1</Text>
    </RadioButtonGroup.RadioButtonItem>
  </RadioButtonGroup>
);

export const DisabledRadioButtonItem = () => (
  <RadioButtonGroup.RadioButtonItem value="item1" disabled>
    <Text>item1</Text>
  </RadioButtonGroup.RadioButtonItem>
);

export const SelectedDisabledRadioButtonItem = () => (
  <RadioButtonGroup selected="item1">
    <RadioButtonGroup.RadioButtonItem value="item1" disabled>
      <Text>item1</Text>
    </RadioButtonGroup.RadioButtonItem>
  </RadioButtonGroup>
);
