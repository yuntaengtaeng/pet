import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';
import Color from '../../../constants/color';

interface Props {
  size: number;
  style?: ViewStyle;
  color?: Color;
}

const Close = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M18 6L6 18"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6 6L18 18"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

Close.defaultProps = {
  color: Color.neutral2,
};

export default Close;
