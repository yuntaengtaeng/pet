import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Up24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M5 15L11.2191 9.66939C11.6684 9.2842 12.3316 9.2842 12.7809 9.66939L19 15"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Up24;
