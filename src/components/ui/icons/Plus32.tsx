import { Svg, Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Plus32 = (props: IconProp) => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={props.style}
    >
      <Path
        d="M16 6.66675L16 25.3334"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.6665 16H25.3332"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Plus32;
