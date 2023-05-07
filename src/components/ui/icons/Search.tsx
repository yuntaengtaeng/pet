import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path, Circle } from 'react-native-svg';
import Color from '../../../constants/color';

interface Props {
  size: number;
  color?: Color;
  style?: ViewStyle;
}

const Search = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Circle
        cx="11"
        cy="11"
        r="8"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 16.958L21.5 21.958"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

Search.defaultProps = {
  color: Color.neutral2,
};

export default Search;
