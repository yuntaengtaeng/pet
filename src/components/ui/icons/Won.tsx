import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Color from '../../../constants/color';
import { ViewStyle } from 'react-native';

interface Props {
  size: number;
  style?: ViewStyle;
  color?: Color;
}

const Won = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M21.758 5H19.68L18.836 8H13.943L13.044 5H10.956L10.057 8H5.164L4.32 5H2.242L3.086 8H2V10H3.648L4.211 12H2V14H4.773L6.461 20H8.544L10.344 14H13.657L15.457 20H17.54L19.228 14H22V12H19.789L20.352 10H22V8H20.914L21.758 5ZM5.727 10H9.456L8.856 12H6.289L5.727 10ZM7.531 16.417L6.852 14H8.256L7.531 16.417ZM10.944 12L11.544 10H12.456L13.056 12H10.944ZM16.469 16.417L15.744 14H17.148L16.469 16.417ZM17.711 12H15.144L14.544 10H18.273L17.711 12Z"
        fill={props.color}
      />
    </Svg>
  );
};

Won.defaultProps = {
  color: Color.neutral2,
};

export default Won;
