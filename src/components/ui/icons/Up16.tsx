import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Up16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M3.3335 10L7.47953 6.44626C7.77912 6.18946 8.2212 6.18946 8.5208 6.44626L12.6668 10"
        stroke={props.color}
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Up16;
