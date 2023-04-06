import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
}

const ArrowRight = (props: Props) => (
  <Svg width={props.width} height={props.height} fill="none" viewBox="0 0 8 16">
    <Path
      d="m1 15 5.33-6.219a1.2 1.2 0 0 0 0-1.562L1 1"
      stroke="#717171"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default ArrowRight;
