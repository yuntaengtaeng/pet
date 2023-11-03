import { IconProp } from '../../../types/interface';
import Svg, { Path } from 'react-native-svg';

const Chat24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 13.6 21.624 15.112 20.957 16.453C20.779 16.809 20.72 17.216 20.823 17.601L21.418 19.827C21.4767 20.0472 21.4765 20.279 21.4174 20.4991C21.3582 20.7192 21.2423 20.9199 21.0811 21.0811C20.9199 21.2423 20.7192 21.3582 20.4991 21.4174C20.279 21.4765 20.0472 21.4767 19.827 21.418L17.601 20.823C17.2146 20.7258 16.806 20.7731 16.452 20.956C15.0691 21.6446 13.5449 22.0021 12 22Z"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default Chat24;
