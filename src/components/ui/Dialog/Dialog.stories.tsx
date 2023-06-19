import type { Meta, StoryObj } from '@storybook/react';
import Dialog from '.';
import { Text } from 'react-native-svg';

const meta = {
  title: 'Design System/Dialog',
  tags: ['autodocs'],
  component: Dialog,
} as Meta;

export default meta;

type Story = StoryObj;

export const DialogBase: Story = {
  args: {
    isOpened: false,
    children: (
      <>
        <Dialog.Title title="dialog title" />
        <Dialog.Content content="A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made." />
        <Dialog.Buttons
          buttons={[
            {
              label: 'label1',
            },
            {
              label: 'label2',
            },
          ]}
        />
      </>
    ),
  },
};

export const NoTitleDialog: Story = {
  args: {
    isOpened: false,
    children: (
      <>
        <Dialog.Content content="A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made." />
        <Dialog.Buttons
          buttons={[
            {
              label: 'label1',
            },
            {
              label: 'label2',
            },
          ]}
        />
      </>
    ),
  },
};

export const NoContentDialog: Story = {
  args: {
    isOpened: false,
    children: (
      <>
        <Dialog.Title title="dialog title" />
        <Dialog.Buttons
          buttons={[
            {
              label: 'label1',
            },
            {
              label: 'label2',
            },
          ]}
        />
      </>
    ),
  },
};

export const OneButtonDialog: Story = {
  args: {
    isOpened: false,
    children: (
      <>
        <Dialog.Title title="dialog title" />
        <Dialog.Buttons
          buttons={[
            {
              label: 'label1',
            },
          ]}
        />
      </>
    ),
  },
};
