import { IconProp } from '../../../types/interface';
import Svg, { Circle, Path } from 'react-native-svg';

const Location16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M13.3332 6.94453C13.3332 10.5631 9.0665 14.3334 7.99984 14.3334C6.93317 14.3334 2.6665 10.5631 2.6665 6.94453C2.6665 4.02969 5.05432 1.66675 7.99984 1.66675C10.9454 1.66675 13.3332 4.02969 13.3332 6.94453Z"
        stroke={props.color}
      />
      <Circle
        cx="2"
        cy="2"
        r="2"
        transform="matrix(-1 0 0 1 10 4.66675)"
        stroke={props.color}
      />
    </Svg>
  );
};

export default Location16;
