import { View, Text, Pressable } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';
import Right16 from '../../ui/icons/Right16';

interface Props {
  timestamp: string;
  content: string;
  onModifyHandler: () => void;
}

const AppointmentNotification = ({
  timestamp,
  content,
  onModifyHandler,
}: Props) => {
  return (
    <View
      style={{ borderWidth: 1, borderColor: Color.neutral4, borderRadius: 8 }}
    >
      <View
        style={{
          backgroundColor: Color.primary50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text
          style={[
            TYPOS.headline4,
            {
              color: Color.primary900,
            },
          ]}
        >
          {timestamp}
        </Text>
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={onModifyHandler}
        >
          <Text
            style={[
              TYPOS.small,
              {
                color: Color.neutral2,
              },
            ]}
          >
            수정하기
          </Text>
          <Right16 color={Color.neutral2} />
        </Pressable>
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
