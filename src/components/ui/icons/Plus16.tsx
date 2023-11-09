import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Plus16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M12 5V19"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5 12H19"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Plus16;
