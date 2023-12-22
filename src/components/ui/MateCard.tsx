import { Pressable, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

interface Props {
  gap: 4 | 16;
  title: string;
  description: string;
  descriptionSize: 2 | 3;
  onPressHandler?: () => void;
}

const MateCard = ({
  gap,
  title,
  description,
  descriptionSize,
  onPressHandler,
}: Props) => {
  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: Color.white,
        gap: gap,
      }}
      onPress={onPressHandler}
    >
      <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>{title}</Text>
      <Text
        style={[TYPOS[`body${descriptionSize}`], { color: Color.neutral2 }]}
      >
        {description}
      </Text>
    </Pressable>
  );
};

export default MateCard;
