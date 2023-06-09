import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Color from '../../../constants/color';

interface Props {
  size: number;
  style?: ViewStyle;
  color?: Color;
  circleColor?: Color;
}

const Camera = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Circle cx={12} cy={12} r={12} fill={props.circleColor} />
      <Path
        stroke={props.color}
        d="M5.333 10.971a2.638 2.638 0 0 1 2.638-2.638c.422 0 .803-.251.97-.64l.206-.48A2 2 0 0 1 10.985 6h2.029a2 2 0 0 1 1.839 1.212l.206.482c.167.388.548.64.97.64a2.638 2.638 0 0 1 2.638 2.637v3.362a3.333 3.333 0 0 1-3.334 3.334H8.667a3.333 3.333 0 0 1-3.334-3.334v-3.362Z"
      />
      <Circle
        cx={2}
        cy={2}
        r={2}
        stroke={props.color}
        transform="matrix(-1 0 0 1 14 10.333)"
      />
    </Svg>
  );
};
Camera.defaultProps = {
  color: Color.neutral2,
  circleColor: Color.white,
};

export default Camera;
