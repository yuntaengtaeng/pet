import { IconProp } from '../../../types/interface';
import Svg, { Circle, Path } from 'react-native-svg';

const User24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      style={props.style}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx="10"
        cy="10"
        r="10"
        transform="matrix(-1 0 0 1 22 2)"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Circle
        cx="3.40426"
        cy="3.40426"
        r="3.40426"
        transform="matrix(-1 0 0 1 15.3618 5)"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M6 16.8594C6 16.1272 6.4603 15.474 7.14986 15.2277V15.2277C10.2588 14.1174 13.6561 14.1174 16.765 15.2277V15.2277C17.4546 15.474 17.9149 16.1272 17.9149 16.8594V17.979C17.9149 18.9896 17.0198 19.7659 16.0194 19.6229L15.6858 19.5753C13.2128 19.222 10.7021 19.222 8.22905 19.5753L7.8955 19.6229C6.89507 19.7659 6 18.9896 6 17.979V16.8594Z"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default User24;
