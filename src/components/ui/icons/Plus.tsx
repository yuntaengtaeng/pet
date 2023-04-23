import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const Plus = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M12 5V19"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5 12H19"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Plus;
