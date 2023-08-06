import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Favorite24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M12.0063 20.6906L3.51888 13.0028C-1.09384 8.39004 5.68686 -0.466388 12.0063 6.69871C18.3257 -0.466388 25.0757 8.42079 20.4937 13.0028L12.0063 20.6906Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Favorite24;
