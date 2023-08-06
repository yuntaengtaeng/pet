import { IconProp } from '../../../types/interface';
import Svg, { Circle, Path } from 'react-native-svg';

const Share24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Circle
        cx="17.5"
        cy="4.5"
        r="2.5"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Circle
        cx="5.5"
        cy="11.5"
        r="2.5"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M15 6L8 10"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 13.5L15 18"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Circle
        cx="17.5"
        cy="19.5"
        r="2.5"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default Share24;
