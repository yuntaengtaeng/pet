import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Send24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.9348 4.62006C21.2551 3.65911 20.3409 2.74489 19.3799 3.06521L3.84069 8.24495C2.83152 8.58134 2.69708 9.95383 3.6218 10.4797L9.19746 13.6501C9.21136 13.658 9.22519 13.666 9.23895 13.6741L9.68131 13.2318L11.73 11.1831C12.03 10.883 12.5165 10.883 12.8165 11.1831C13.1165 11.4831 13.1165 11.9695 12.8165 12.2696L10.7678 14.3183L10.3255 14.7605C10.3337 14.7744 10.3418 14.7884 10.3498 14.8025L13.5203 20.3782C14.0462 21.3029 15.4186 21.1685 15.755 20.1593L20.9348 4.62006Z"
        fill={props.color}
      />
    </Svg>
  );
};

export default Send24;
