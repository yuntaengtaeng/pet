import { View, Text } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';

interface Props {
  timestamp: string;
  content: string;
}

const AppointmentNotification = ({ timestamp, content }: Props) => {
  return (
    <View
      style={{ borderWidth: 1, borderColor: Color.neutral4, borderRadius: 8 }}
    >
      <View style={{ backgroundColor: Color.primary50 }}>
        <Text
          style={[
            TYPOS.headline4,
            {
              color: Color.primary900,
              paddingHorizontal: 16,
              paddingVertical: 12,
            },
          ]}
        >
          {timestamp}
        </Text>
      </View>
      <View style={{ backgroundColor: Color.white }}>
        <Text style={[TYPOS.body2, { color: Color.neutral1, padding: 16 }]}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentNotification;
