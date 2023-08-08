import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const FillPin24 = (props: IconProp) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <Path
        d="M15.375 15.375L21.375 21.375L15.375 15.375ZM2.625 10.125L10.125 2.625C10.125 2.625 11.625 5.625 13.125 7.125C14.625 8.625 19.875 10.125 19.875 10.125L10.125 19.875C10.125 19.875 8.625 14.625 7.125 13.125C5.625 11.625 2.625 10.125 2.625 10.125Z"
        fill="white"
      />
      <Path
        d="M15.375 15.375L21.375 21.375M2.625 10.125L10.125 2.625C10.125 2.625 11.625 5.625 13.125 7.125C14.625 8.625 19.875 10.125 19.875 10.125L10.125 19.875C10.125 19.875 8.625 14.625 7.125 13.125C5.625 11.625 2.625 10.125 2.625 10.125Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default FillPin24;
