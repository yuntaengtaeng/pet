import type { Meta, StoryObj } from '@storybook/react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import PhotoSelector from './PhotoSelector';
import React from 'react';

const meta = {
  title: 'UI/PhotoSelector',
  component: PhotoSelector,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} satisfies Meta<typeof PhotoSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhotoSelectorExample: Story = {
  args: {
    selectedPhotos: [
      {
        uri: 'https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632',
        id: '649193f013a61cf6c63e75cd',
      },
    ],
  },
};
