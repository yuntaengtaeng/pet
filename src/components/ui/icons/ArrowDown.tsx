import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const ArrowDown = (props: Props) => (
  <Svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    style={props.style}
  >
    <Path
      d="M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9"
      stroke="#4D4C4C"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </Svg>
);

export default ArrowDown;
