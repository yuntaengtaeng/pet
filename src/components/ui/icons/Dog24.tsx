import { Path, Svg } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Dog24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M9.99998 5.17236C9.99998 3.78236 8.42298 2.67936 6.49998 3.00036C3.67698 3.47036 2.38698 9.00636 2.49998 10.0004C2.57998 10.7034 4.22498 11.7224 6.15598 11.0004C7.41698 10.5284 8.11598 9.55036 8.49998 8.50036M14.267 5.17236C14.267 3.78236 15.844 2.67936 17.767 3.00036C20.59 3.47036 21.88 9.00636 21.767 10.0004C21.687 10.7034 20.042 11.7224 18.111 11.0004C16.85 10.5284 16.256 9.55036 15.872 8.50036M7.99998 14.0004V14.5004M16 14.0004V14.5004M11.25 16.2504H12.75L12 17.0004L11.25 16.2504Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.42001 11.2481C4.14014 12.3288 3.999 13.4407 4.00001 14.5571C4.00001 18.7291 7.58201 21.0011 12 21.0011C16.418 21.0011 20 18.7291 20 14.5571C20 13.4961 19.838 12.3571 19.507 11.2481M10.264 5.16606C10.8358 5.05373 11.4173 4.99846 12 5.00106C12.78 5.00106 13.5 5.10906 14.161 5.30706"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Dog24;
