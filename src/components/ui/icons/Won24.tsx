import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Won24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M4 6L7.245 17.358C7.29482 17.5327 7.3993 17.6868 7.5431 17.7978C7.68691 17.9088 7.86248 17.9707 8.04409 17.9747C8.22569 17.9786 8.40378 17.9242 8.55223 17.8195C8.70068 17.7149 8.8117 17.5654 8.869 17.393L12 8L15.131 17.393C15.1883 17.5654 15.2993 17.7149 15.4478 17.8195C15.5962 17.9242 15.7743 17.9786 15.9559 17.9747C16.1375 17.9707 16.3131 17.9088 16.4569 17.7978C16.6007 17.6868 16.7052 17.5327 16.755 17.358L20 6M21 10H3M21 14H3"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Won24;
