import { IconProp } from '../../../types/interface';
import Svg, { Circle, Path } from 'react-native-svg';

const Eye16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M2.13371 8.52295C1.95543 8.19694 1.95543 7.80297 2.13372 7.47696C3.26667 5.40535 5.4689 4 7.99998 4C10.5311 4 12.7334 5.40539 13.8663 7.47705C14.0446 7.80307 14.0446 8.19703 13.8663 8.52304C12.7333 10.5947 10.5311 12 8.00002 12C5.46891 12 3.26665 10.5946 2.13371 8.52295Z"
        stroke={props.color}
      />
      <Circle cx="8" cy="8" r="2" stroke={props.color} />
    </Svg>
  );
};

export default Eye16;
