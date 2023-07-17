import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';
import Color from '../../../constants/color';

interface Props {
  size: number;
  color?: Color;
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
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20 12L4 12"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20 18H4"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

Burger.defaultProps = {
  color: Color.neutral2,
};

export default Burger;
