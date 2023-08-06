import Svg, { Path, Circle } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Camera16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M1.3335 6.97097C1.3335 5.51424 2.51441 4.33333 3.97113 4.33333V4.33333C4.39318 4.33333 4.77462 4.08181 4.94088 3.69389L5.14733 3.21216C5.46249 2.47679 6.18557 2 6.98562 2H8.00016H9.0147C9.81476 2 10.5378 2.47679 10.853 3.21216L11.0594 3.69388C11.2257 4.08181 11.6071 4.33333 12.0292 4.33333V4.33333C13.4859 4.33333 14.6668 5.51424 14.6668 6.97097V10.3333C14.6668 12.1743 13.1744 13.6667 11.3335 13.6667H4.66683C2.82588 13.6667 1.3335 12.1743 1.3335 10.3333L1.3335 6.97097Z"
        stroke={props.color}
      />
      <Circle
        cx="2"
        cy="2"
        r="2"
        transform="matrix(-1 0 0 1 10 6.33325)"
        stroke={props.color}
      />
    </Svg>
  );
};

export default Camera16;
