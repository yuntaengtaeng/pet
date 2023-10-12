import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './TextArea';

const meta = {
  title: 'Design System/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaBase: Story = {
  args: {
    placeholder: 'placeholder',
  },
};

export const TextAreaDisabled: Story = {
  args: {
    placeholder: 'placeholder',
    disabled: true,
  },
};

export const TextAreaError: Story = {
  args: {
    placeholder: 'placeholder',
    isError: true,
    errorMessage: 'errorMessage',
  },
};

export const TextAreaMaxLength: Story = {
  args: {
    placeholder: 'placeholder',
    value: 'value',
    maxLength: 200,
  },
};

export const TextAreaMaxLengthError: Story = {
  args: {
    placeholder: 'placeholder',
    value: 'value',
    maxLength: 200,
    isError: true,
    errorMessage: 'errorMessage',
  },
};
