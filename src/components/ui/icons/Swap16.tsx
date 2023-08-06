import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Swap16 = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path
        d="M4.82463 13L3.20668 11.382C2.93111 11.1065 2.93111 10.6597 3.20668 10.3841L4.82463 8.76617M3.41335 10.8831L11.881 10.8831M11.1754 6.64926L12.7933 5.03131C13.0689 4.75574 13.0689 4.30895 12.7933 4.03338L11.1754 2.41543M12.5866 4.53235L4.11899 4.53234"
        stroke={props.color}
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Swap16;
