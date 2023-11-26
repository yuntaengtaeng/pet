import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Schedule16 = (props: IconProp) => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={props.style}
  >
    <Path d="M2 5.66659H14" stroke={props.color} stroke-linejoin="round" />
    <Path
      d="M10.9998 1.33325L10.9998 3.33325"
      stroke={props.color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M4.99984 1.33325L4.99984 3.33325"
      stroke={props.color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12.4998 9.66675C10.9356 9.66675 9.6665 10.9358 9.6665 12.5001C9.6665 14.0643 10.9356 15.3334 12.4998 15.3334C14.0641 15.3334 15.3332 14.0643 15.3332 12.5001C15.3332 10.9358 14.0641 9.66675 12.4998 9.66675Z"
      stroke={props.color}
      stroke-miterlimit="10"
    />
    <Path
      d="M12.333 11.3335V12.6668H13.6663"
      stroke={props.color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.83333 0.0769043C3.71624 0.0769043 2 1.79314 2 3.91024V11.0897C2 13.2068 3.71624 14.9231 5.83333 14.9231H11.0246C10.7793 14.6344 10.5774 14.2963 10.4312 13.9231H5.83333C4.26853 13.9231 3 12.6545 3 11.0897V3.91024C3 2.34543 4.26853 1.0769 5.83333 1.0769H11.1667C12.7315 1.0769 14 2.34543 14 3.91024V9.17382C14.3671 9.29618 14.7053 9.49731 15 9.7603V3.91024C15 1.79315 13.2838 0.0769043 11.1667 0.0769043H5.83333Z"
      fill={props.color}
    />
  </Svg>
);

export default Schedule16;
