import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';

import Carousel from './Carousel';

const meta = {
  title: 'ui/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarouselDefault: Story = {
  args: {
    data: ['테스트 문구1', '테스트 문구2'],
    renderItem: (item: {}) => {
      return (
        <View>
          <Text>{item.toString()}</Text>
        </View>
      );
    },
  },
};
