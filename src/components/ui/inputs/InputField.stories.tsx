import type { Meta, StoryObj } from '@storybook/react';

import InputField from './InputField';
import Search24 from '../icons/Search24';
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
        <Search24
          color={hasFocus ? Color.primary700 : Color.neutral1}
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
