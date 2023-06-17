import type { Meta, StoryObj } from '@storybook/react';

import InputField from './InputField';
import Search from '../icons/Search';
import Color from '../../../constants/color';

const meta = {
  title: 'Design System/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputFieldBase: Story = {
  args: {
    placeholder: 'placeholder',
  },
};

export const InputFieldDisabled: Story = {
  args: {
    placeholder: 'placeholder',
    disabled: true,
  },
};

export const InputFieldSearch: Story = {
  args: {
    placeholder: 'placeholder',
    leftIcon(hasFocus) {
      return (
        <Search
          size={24}
          {...(hasFocus && { color: Color.primary700 })}
          style={{
            marginLeft: 16,
          }}
        />
      );
    },
  },
};

export const InputFieldError: Story = {
  args: {
    placeholder: 'placeholder',
    isError: true,
    errorMessage: 'errorMessage',
  },
};

export const InputFieldPassword: Story = {
  args: {
    placeholder: 'placeholder',
    isPassword: true,
  },
};
