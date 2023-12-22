import Svg, { Circle, Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Person24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Circle
        cx="4"
        cy="4"
        r="4"
        transform="matrix(-1 0 0 1 16 3)"
        stroke={props.color}
        stroke-width="1.5"
      />
      <Path
        d="M5 16.9347C5 16.0743 5.54085 15.3068 6.35109 15.0175V15.0175C10.004 13.7128 13.996 13.7128 17.6489 15.0175V15.0175C18.4591 15.3068 19 16.0743 19 16.9347V18.2502C19 19.4376 17.9483 20.3498 16.7728 20.1818L15.8184 20.0455C13.2856 19.6837 10.7144 19.6837 8.18162 20.0455L7.22721 20.1818C6.0517 20.3498 5 19.4376 5 18.2502V16.9347Z"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default Person24;
