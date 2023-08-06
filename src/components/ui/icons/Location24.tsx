import { IconProp } from '../../../types/interface';
import Svg, { Circle, Path } from 'react-native-svg';

const Location24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      style={props.style}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M20 10.4167C20 15.8445 13.6 21.5 12 21.5C10.4 21.5 4 15.8445 4 10.4167C4 6.04441 7.58172 2.5 12 2.5C16.4183 2.5 20 6.04441 20 10.4167Z"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Circle
        cx="3"
        cy="3"
        r="3"
        transform="matrix(-1 0 0 1 15 7)"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default Location24;
