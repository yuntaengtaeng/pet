import type { Meta, StoryObj } from '@storybook/react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import Header from './Header';

const meta = {
  title: 'Design System/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderBase: Story = {
  args: {
    title: 'title',
  },
};
