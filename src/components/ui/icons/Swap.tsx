import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Color from '../../../constants/color';
import { ViewStyle } from 'react-native';

interface Props {
  size: number;
  style?: ViewStyle;
  color?: Color;
}

const Swap = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M5.07142 8C5.80911 6.72229 6.88577 5.67345 8.18235 4.96946C9.47894 4.26547 10.945 3.93375 12.4183 4.01097C13.8917 4.08818 15.315 4.57133 16.5309 5.40699C17.7468 6.24266 18.7079 7.39828 19.308 8.74611M3.23145 5.51537L3.96086 8.6749C4.08509 9.21303 4.62204 9.54856 5.16017 9.42433L8.31971 8.69492M18.9279 15.9999C18.1902 17.2776 17.1135 18.3264 15.8169 19.0304C14.5203 19.7344 13.0543 20.0661 11.581 19.9889C10.1076 19.9117 8.68431 19.4286 7.46841 18.5929C6.25252 17.7572 5.29139 16.6016 4.6913 15.2538M20.7678 18.4845L20.0384 15.325C19.9142 14.7869 19.3772 14.4513 18.8391 14.5756L15.6796 15.305"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

Swap.defaultProps = {
  color: Color.neutral2,
};

export default Swap;
