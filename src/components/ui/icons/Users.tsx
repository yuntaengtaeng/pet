import React from 'react';
import { ViewStyle } from 'react-native';

import Svg, { Circle, Path } from 'react-native-svg';
import Color from '../../../constants/color';

interface Props {
  size: number;
  style?: ViewStyle;
  color?: Color;
}

const Users = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      style={props.style}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx="3.40426"
        cy="3.40426"
        r="3.40426"
        transform="matrix(-1 0 0 1 15.6172 5)"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M6.25537 16.8594C6.25537 16.1272 6.71567 15.474 7.40524 15.2277V15.2277C10.5141 14.1174 13.9115 14.1174 17.0204 15.2277V15.2277C17.71 15.474 18.1703 16.1272 18.1703 16.8594V17.979C18.1703 18.9896 17.2752 19.7659 16.2748 19.6229L15.9412 19.5753C13.4682 19.222 10.9575 19.222 8.48442 19.5753L8.15087 19.6229C7.15044 19.7659 6.25537 18.9896 6.25537 17.979V16.8594Z"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M17.3194 11.9028C18.7966 11.9028 19.9941 10.7052 19.9941 9.22799C19.9941 7.75076 18.7966 6.55322 17.3194 6.55322"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20.2486 18.0051L20.5106 18.0425C21.2967 18.1548 22 17.5448 22 16.7508V15.8711C22 15.2958 21.6383 14.7826 21.0965 14.5891C20.5561 14.3961 20.0045 14.2458 19.4468 14.1382"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M6.68063 11.9028C5.2034 11.9028 4.00586 10.7052 4.00586 9.22799C4.00586 7.75076 5.2034 6.55322 6.68063 6.55322"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M3.75143 18.0051L3.48935 18.0425C2.7033 18.1548 2.00003 17.5448 2.00003 16.7508V15.8711C2.00003 15.2958 2.3617 14.7826 2.9035 14.5891C3.44395 14.3961 3.99549 14.2458 4.55322 14.1382"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

Users.defaultProps = {
  color: Color.neutral2,
};

export default Users;
