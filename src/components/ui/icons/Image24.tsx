import { Svg, Circle, Path, Rect } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Image24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Rect
        x="1.99951"
        y="2.00098"
        width="20"
        height="20"
        rx="5"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M2.49951 17.501L4.75871 15.8873C5.47472 15.3758 6.45554 15.457 7.07773 16.0792L8.15098 17.1524C8.61961 17.6211 9.37941 17.6211 9.84804 17.1524L14.8372 12.1633C15.4955 11.505 16.5471 11.4573 17.2623 12.0533L21.9995 16.001"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Circle
        cx="2"
        cy="2"
        r="2"
        transform="matrix(-1 0 0 1 9.99951 6)"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default Image24;
