import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Right24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M9 5L14.3306 11.2191C14.7158 11.6684 14.7158 12.3316 14.3306 12.7809L9 19"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Right24;
