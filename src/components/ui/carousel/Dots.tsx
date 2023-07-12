import React from 'react';
import { View } from 'react-native';
import Color from '../../../constants/color';

interface Props {
  length: number;
  selectedPage: number;
}

const Dots = ({ length, selectedPage }: Props) => {
  if (length <= 1) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 16,
        flexDirection: 'row',
        left: 0,
        right: 0,
        justifyContent: 'center',
      }}
    >
      {Array.from({ length: length }, (_, i) => i).map((i) => (
        <View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor: i === selectedPage ? Color.white : Color.neutral3,
            marginRight: 8,
          }}
        ></View>
      ))}
    </View>
  );
};

export default Dots;
