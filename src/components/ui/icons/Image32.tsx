import { Svg, Circle, Path, Rect } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Image32 = (props: IconProp) => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={props.style}
    >
      <Rect
        x="2.6665"
        y="2.66675"
        width="26.6667"
        height="26.6667"
        rx="6.66667"
        stroke={props.color}
        stroke-width="2"
      />
      <Path
        d="M3.33301 23.3334L6.34527 21.1818C7.29995 20.4999 8.60771 20.6081 9.4373 21.4377L10.8683 22.8687C11.4931 23.4936 12.5062 23.4935 13.131 22.8687L19.7832 16.2165C20.661 15.3388 22.0631 15.2752 23.0167 16.0698L29.333 21.3334"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <Circle
        cx="2.66667"
        cy="2.66667"
        r="2.66667"
        transform="matrix(-1 0 0 1 13.333 8)"
        stroke={props.color}
        stroke-width="2"
      />
    </Svg>
  );
};

export default Image32;
