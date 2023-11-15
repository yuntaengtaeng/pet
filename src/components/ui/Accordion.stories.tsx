import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';

import Accordion from './Accordion';
import Time24 from './icons/Time24';

const meta = {
  title: 'ui/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordionExample: Story = {
  args: {
    title: 'Title',
    children: (
      <View>
        <Text>Content</Text>
      </View>
    ),
  },
};

export const AccordionActiveExample: Story = {
  args: {
    title: 'Title',
    titleActive: true,
    children: (
      <View>
        <Text>Content</Text>
      </View>
    ),
  },
};

export const AccordionTitleIconExample: Story = {
  args: {
    title: 'Title',
    titleIcon: <Time24 color={Color.black} />,
    children: (
      <View>
        <Text>Content</Text>
      </View>
    ),
  },
};
