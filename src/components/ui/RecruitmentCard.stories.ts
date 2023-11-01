import type { Meta, StoryObj } from '@storybook/react';

import RecruitmentCard from './RecruitmentCard';

const meta = {
  title: 'UI/RecruitmentCard',
  component: RecruitmentCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RecruitmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecruitmentCardExample: Story = {
  args: {
    status: '모집중',
    title: 'Title',
    description: 'description',
    limit: {
      max: 10,
      current: 3,
    },
  },
};
