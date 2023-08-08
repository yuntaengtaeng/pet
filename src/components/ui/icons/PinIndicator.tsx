import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const PinIndicator = (props: IconProp) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={props.style}
    >
      <Path d="M16 0H0L16 16V0Z" fill="#FEAD26" />
    </Svg>
  );
};

export default PinIndicator;
