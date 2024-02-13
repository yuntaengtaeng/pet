import { Image, ImageStyle } from 'react-native';

interface Props {
  size: number;
  url?: string;
  style?: ImageStyle;
}

const PetImage = ({ size, url, style }: Props) => {
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
        ...style,
      }}
      source={
        !!url
          ? { uri: url }
          : require('../../../assets/img/pet-placeholder.png')
      }
    />
  );
};

export default PetImage;
