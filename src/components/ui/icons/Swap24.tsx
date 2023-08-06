import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Swap24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M7.23694 19.5L4.81002 17.0731C4.39666 16.6597 4.39666 15.9895 4.81002 15.5762L7.23694 13.1493M5.12003 16.3246L17.8215 16.3246M16.7631 9.97389L19.19 7.54696C19.6033 7.13361 19.6033 6.46343 19.19 6.05008L16.7631 3.62315M18.88 6.79852L6.17849 6.79852"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Swap24;
