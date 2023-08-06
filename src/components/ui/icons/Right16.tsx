import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Right16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M6 3.33325L9.55374 7.47929C9.81054 7.77888 9.81054 8.22096 9.55374 8.52055L6 12.6666"
        stroke={props.color}
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Right16;
