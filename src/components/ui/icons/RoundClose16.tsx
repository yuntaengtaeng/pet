import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const RoundClose16 = (props: IconProp) => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={props.style}
  >
    <Path
      d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z"
      fill={props.color}
      stroke={props.color}
      stroke-linecap="round"
    />
    <Path
      d="M10.6668 5.33325L5.3335 10.6666"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.3335 5.33325L10.6668 10.6666"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default RoundClose16;
