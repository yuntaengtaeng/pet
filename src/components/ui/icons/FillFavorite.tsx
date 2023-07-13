import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';
import Color from '../../../constants/color';

interface Props {
  size: number;
  style?: ViewStyle;
  color?: Color;
}

const FillFavorite = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 32 32"
      fill="none"
      style={props.style}
    >
      <Path
        d="M16.0087 27.5877L4.69216 17.3372C-1.45813 11.1869 7.5828 -0.621688 16.0087 8.93177C24.4346 -0.621688 33.4346 11.2279 27.3253 17.3372L16.0087 27.5877Z"
        fill={props.color}
      />
    </Svg>
  );
};

FillFavorite.defaultProps = {
  color: Color.neutral2,
};

export default FillFavorite;
