import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Favorite16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M8.00435 13.7936L2.34608 8.66834C-0.729066 5.5932 3.7914 -0.311088 8.00435 4.46564C12.2173 -0.311088 16.7173 5.6137 13.6626 8.66834L8.00435 13.7936Z"
        stroke={props.color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Favorite16;
