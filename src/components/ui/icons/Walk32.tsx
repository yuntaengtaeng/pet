import Svg, { Path } from 'react-native-svg';
import { IconProp } from '../../../types/interface';

const Won24 = (props: IconProp) => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={props.style}
    >
      <Path
        d="M11.1335 4.00004C12.7069 3.77337 14.3735 5.49337 14.8535 7.8667C15.3335 10.2267 14.4669 12.3334 12.8935 12.5734C11.3335 12.8134 9.65353 11.0934 9.1602 8.72004C8.66687 6.36004 9.5602 4.25337 11.1335 4.00004ZM20.6669 4.00004C22.2535 4.25337 23.1335 6.36004 22.6669 8.72004C22.1602 11.0934 20.4935 12.8134 18.9202 12.5734C17.3335 12.3334 16.4669 10.2267 16.9602 7.8667C17.4402 5.49337 19.1069 3.77337 20.6669 4.00004ZM4.0002 10.1334C5.5202 9.48004 7.58687 10.6667 8.66687 12.7334C9.6802 14.84 9.33353 17.0534 7.82687 17.7067C6.3202 18.36 4.26687 17.1867 3.21353 15.0934C2.1602 13 2.53353 10.7734 4.0002 10.1334ZM28.0002 10.1334C29.4669 10.7734 29.8402 13 28.7869 15.0934C27.7335 17.1867 25.6802 18.36 24.1735 17.7067C22.6669 17.0534 22.3202 14.84 23.3335 12.7334C24.4135 10.6667 26.4802 9.48004 28.0002 10.1334ZM25.7735 24.5067C25.8269 25.76 24.8669 27.1467 23.7202 27.6667C21.3335 28.76 18.5069 26.4934 15.8535 26.4934C13.2002 26.4934 10.3469 28.8534 8.0002 27.6667C6.66687 27.0134 5.74687 25.28 5.9202 23.84C6.1602 21.8534 8.54687 20.7867 9.9602 19.3334C11.8402 17.4534 13.1735 13.92 15.8535 13.92C18.5202 13.92 19.9335 17.4 21.7335 19.3334C23.2135 20.96 25.6802 22.3334 25.7735 24.5067Z"
        fill={props.color}
      />
    </Svg>
  );
};

export default Won24;
