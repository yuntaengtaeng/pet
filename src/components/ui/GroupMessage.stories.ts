import type { Meta, StoryObj } from '@storybook/react';

import GroupMessage from './GroupMessage';

const meta = {
  title: 'UI/GroupMessage',
  component: GroupMessage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GroupMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupMessageExample: Story = {
  args: {
    message: '택배거래도 하실까요?',
    isSentByMe: true,
    timeStamp: '오후 9:44',
    nickname: 'nickname',
  },
};
