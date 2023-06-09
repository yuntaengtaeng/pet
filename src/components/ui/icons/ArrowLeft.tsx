import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const ArrowLeft = (props: Props) => (
  <Svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    style={props.style}
  >
    <Path
      d="M15 5L9.66939 11.2191C9.2842 11.6684 9.2842 12.3316 9.66939 12.7809L15 19"
      stroke="#4D4C4C"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </Svg>
);

export default ArrowLeft;
