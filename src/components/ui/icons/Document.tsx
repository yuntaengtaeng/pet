import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path, Rect } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const Minus = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="4"
        stroke="#4D4C4C"
        stroke-width="1.5"
      />
      <Path
        d="M8 7H16"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M8 12H16"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M8 17H12"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Minus;
