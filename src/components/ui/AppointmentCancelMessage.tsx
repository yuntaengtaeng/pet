import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

interface Props {
  content: string;
}

const AppointmentCancelMessage = ({ content }: Props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          padding: 8,
          borderRadius: 8,
          backgroundColor: Color.errorBg,
        }}
      >
        <Text style={[TYPOS.body2, { color: Color.error }]}>{content}</Text>
      </View>
    </View>
  );
};

export default AppointmentCancelMessage;
