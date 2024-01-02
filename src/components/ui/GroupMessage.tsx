import { View, Image, Text } from 'react-native';
import ChatBubble, { ChatBubbleProps } from './ChatBubble';
import TYPOS from './typo';
import Crown16 from './icons/Crown16';

interface Props extends ChatBubbleProps {
  nickname: string;
  isHost?: boolean;
  profileImage?: string;
}

const GroupMessage = ({
  nickname,
  isHost,
  profileImage,
  message,
  isSentByMe = false,
  timeStamp,
}: Props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ marginRight: 4 }}>
        <Image
          style={{ width: 24, height: 24, borderRadius: 24 }}
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../../assets/img/placeholder.png')
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 4, flexDirection: 'row' }}>
          <Text
            style={[
              {
                lineHeight: 16,
                fontWeight: '600',
                fontSize: 12,
                fontFamily: 'Pretendard_Regular',
                marginRight: 2,
              },
            ]}
          >
            {nickname}
          </Text>
          {isHost && <Crown16 />}
        </View>
        <ChatBubble
          message={message}
          isSentByMe={isSentByMe}
          timeStamp={timeStamp}
        />
      </View>
    </View>
  );
};

export default GroupMessage;
