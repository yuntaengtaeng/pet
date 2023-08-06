import { IconProp } from '../../../types/interface';
import Svg, { Circle, Path } from 'react-native-svg';

const Camera32 = (props: IconProp) => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={props.style}
    >
      <Path
        d="M2.6665 13.9419C2.6665 11.0285 5.02832 8.66667 7.94177 8.66667V8.66667C8.78588 8.66667 9.54876 8.16362 9.88127 7.38777L10.2942 6.42432C10.9245 4.95359 12.3706 4 13.9708 4H15.9998H18.0289C19.629 4 21.0752 4.95359 21.7055 6.42432L22.1184 7.38777C22.4509 8.16362 23.2138 8.66667 24.0579 8.66667V8.66667C26.9714 8.66667 29.3332 11.0285 29.3332 13.9419V20.6667C29.3332 24.3486 26.3484 27.3333 22.6665 27.3333H9.33317C5.65127 27.3333 2.6665 24.3486 2.6665 20.6667V13.9419Z"
        stroke={props.color}
        stroke-width="2"
      />
      <Circle
        cx="4"
        cy="4"
        r="4"
        transform="matrix(-1 0 0 1 20 12.6667)"
        stroke={props.color}
        stroke-width="2"
      />
    </Svg>
  );
};

export default Camera32;
