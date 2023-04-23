import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const Burger = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M20 6L4 6"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20 12L4 12"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20 18H4"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Burger;
