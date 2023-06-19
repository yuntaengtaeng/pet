import React from 'react';
import TextButton, { Props as ButtonProps } from '../buttons/TextButton';
import { View } from 'react-native';

type Button = Omit<ButtonProps, 'buttonType'>;

interface Props {
  buttons: readonly [Button, Button] | [Button];
}

const Buttons = ({ buttons }: Props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      {buttons.map((button) => (
        <TextButton {...button} key={button.label} style={{ marginLeft: 8 }} />
      ))}
    </View>
  );
};

export default Buttons;
