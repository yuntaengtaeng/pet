import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Check16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M13.3332 4L5.99984 11.3333L2.6665 8"
        stroke={props.color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Check16;
