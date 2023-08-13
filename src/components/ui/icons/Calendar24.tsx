import Svg, { Path, Rect } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Calendar24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Rect
        x="3"
        y="3.5"
        width="18"
        height="18"
        rx="5"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M3 8.5H21"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 2L16.5 5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 2L7.5 5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.5 12.5H7.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.5 12.5H12.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 12.5H17.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.5 16.5H7.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.5 16.5H12.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 16.5H17.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Calendar24;
