import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TextButton from './buttons/TextButton';
import MateRequestLabel, {
  Props as MateRequestLabelProps,
} from './MateRequestLabel';
import TYPOS from './typo';

interface Props extends Omit<MateRequestLabelProps, 'isHost'> {
  message?: string;
  onAcceptHandler: () => void;
}

const MateRequestCard = ({
  image,
  name,
  pets,
  message,
  onAcceptHandler,
}: Props) => {
  return (
    <View style={{ padding: 8, gap: 16, backgroundColor: Color.white }}>
      <MateRequestLabel
        name={name}
        pets={pets}
        image={image}
        containerStyle={{ paddingHorizontal: 8 }}
      />
      {!!message && (
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={[TYPOS.body2, { color: Color.neutral2 }]}>
            {message}
          </Text>
        </View>
      )}
      <View
        style={{ width: '100%', height: 1, backgroundColor: Color.neutral4 }}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextButton label="수락하기" onPressHandler={onAcceptHandler} />
      </View>
    </View>
  );
};

export default MateRequestCard;
