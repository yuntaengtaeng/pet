import { View } from 'react-native';
import Color from '../../../constants/color';

interface Props {
  marginVertical?: number;
  marginHorizontal?: number;
}

const Line = ({ marginVertical, marginHorizontal }: Props) => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: Color.neutral5,
        marginVertical,
        marginHorizontal,
      }}
    />
  );
};

export default Line;
