import React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const ArrowSwap = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M7.99985 19L5.70696 16.7071C5.31643 16.3166 5.31643 15.6834 5.70696 15.2929L7.99985 13M5.99985 16L17.9998 16M16.9999 10L19.2927 7.70711C19.6833 7.31658 19.6833 6.68342 19.2927 6.29289L16.9999 4M18.9999 7L6.99985 7"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default ArrowSwap;
