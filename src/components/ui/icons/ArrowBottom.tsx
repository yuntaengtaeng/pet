import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
}

const ArrowBottom = (props: Props) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox={`0 0 16 8`}
  >
    <Path
      d="m1 1 6.22 5.33a1.2 1.2 0 0 0 1.561 0L15 1"
      stroke="#717171"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default ArrowBottom;
