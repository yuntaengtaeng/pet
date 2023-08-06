import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const FillFavorite32 = (props: IconProp) => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={props.style}
    >
      <Path
        d="M16.0082 27.5874L4.69167 17.3369C-1.45862 11.1866 7.58231 -0.621932 16.0082 8.93153C24.4341 -0.621932 33.4341 11.2276 27.3248 17.3369L16.0082 27.5874Z"
        fill={props.color}
      />
    </Svg>
  );
};

export default FillFavorite32;
