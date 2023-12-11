import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

interface Props {
  nickname: string;
}

const AppointmentCancelMessage = ({ nickname }: Props) => {
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
        <Text style={[TYPOS.body2, { color: Color.error }]}>
          {nickname}님이 약속을 삭제했어요.
        </Text>
      </View>
    </View>
  );
};

export default AppointmentCancelMessage;
