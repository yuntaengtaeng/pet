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
        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 13.6 2.376 15.112 3.043 16.453C3.221 16.809 3.28 17.216 3.177 17.601L2.582 19.827C2.52329 20.0472 2.52351 20.279 2.58264 20.4991C2.64177 20.7192 2.75773 20.9199 2.91889 21.0811C3.08005 21.2423 3.28075 21.3582 3.50087 21.4174C3.72098 21.4765 3.95277 21.4767 4.173 21.418L6.399 20.823C6.78541 20.7258 7.19403 20.7731 7.548 20.956C8.93092 21.6446 10.4551 22.0021 12 22Z"
        stroke={props.color}
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default Chat24;
