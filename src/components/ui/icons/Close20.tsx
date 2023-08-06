import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Close20 = (props: IconProp) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={props.style}
    >
      <Path
        d="M15 5L5 15"
        stroke={props.color}
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5 5L15 15"
        stroke={props.color}
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Close20;
