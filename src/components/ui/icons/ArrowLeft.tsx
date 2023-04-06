import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
}

const ArrowLeft = (props: Props) => (
  <Svg width={props.width} height={props.height} fill="none" viewBox="0 0 8 16">
    <Path
      d="M7 1 1.67 7.22a1.2 1.2 0 0 0 0 1.561L7 15"
      stroke="#717171"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default ArrowLeft;
