import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Left16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M10 3.3335L6.44626 7.47953C6.18946 7.77912 6.18946 8.2212 6.44626 8.5208L10 12.6668"
        stroke={props.color}
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Left16;
