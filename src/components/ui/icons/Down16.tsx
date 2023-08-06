import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Down16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M3.3335 6L7.47953 9.55374C7.77912 9.81054 8.2212 9.81054 8.5208 9.55374L12.6668 6"
        stroke={props.color}
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Down16;
