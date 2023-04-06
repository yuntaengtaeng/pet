import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color?: string;
}

const Search = (props: Props) => {
  const { width, height, color } = props;

  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 21 21">
      <Circle
        cx={9}
        cy={9}
        r={8}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m14.5 14.958 5 5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

Search.defaultProps = {
  color: '#717171',
};

export default Search;
