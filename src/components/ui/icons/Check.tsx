import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  style?: ViewStyle;
}

const Check = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M9 5L14.3306 11.2191C14.7158 11.6684 14.7158 12.3316 14.3306 12.7809L9 19"
        stroke="#4D4C4C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Check;
