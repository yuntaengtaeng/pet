import type { Meta, StoryObj } from '@storybook/react';

import ChatBubble from './ChatBubble';

const meta = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomSheetExample: Story = {
  args: {
    message: '택배거래도 하실까요?',
    isSentByMe: true,
    timeStamp: '오후 9:44',
  },
};
