import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const ArrowUp = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <Path
        d="M5 15L11.2191 9.66939C11.6684 9.2842 12.3316 9.2842 12.7809 9.66939L19 15"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default ArrowUp;
