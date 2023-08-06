import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Burger24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M20 6L4 6"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20 12L4 12"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M20 18H4"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Burger24;
