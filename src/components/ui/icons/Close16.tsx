import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Close16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M12 4L4 12"
        stroke={props.color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4 4L12 12"
        stroke={props.color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Close16;
