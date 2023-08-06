import { IconProp } from '../../../types/interface';
import Svg, { Path, Rect } from 'react-native-svg';

const Document24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="4"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M8 7H16"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M8 12H16"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M8 17H12"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Document24;
