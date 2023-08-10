import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';

interface ChatBubbleProps {
  message: string;
  isSentByMe: boolean;
  timeStamp?: string;
}

const ChatBubble = ({ message, isSentByMe, timeStamp }: ChatBubbleProps) => {
  const bubbleStyles = isSentByMe ? styles.sentBubble : styles.receivedBubble;
  const textStyles = isSentByMe ? styles.sentText : styles.receivedText;

  const processMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <Text key={index} style={[textStyles, TYPOS.body2]}>
        {line}
      </Text>
    ));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
      }}
    >
      {isSentByMe && (
        <Text style={[TYPOS.body3, { color: Color.neutral3, marginRight: 4 }]}>
          {timeStamp}
        </Text>
      )}
      <View style={[styles.bubbleContainer, bubbleStyles]}>
        {processMessage(message)}
      </View>
      {!isSentByMe && (
        <Text style={[TYPOS.body3, { color: Color.neutral3, marginLeft: 4 }]}>
          {timeStamp}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sentBubble: {
    backgroundColor: Color.primary700,
  },
  receivedBubble: {
    backgroundColor: Color.neutral5,
  },
  sentText: {
    color: Color.white,
  },
  receivedText: {
    color: Color.neutral1,
  },
});

export default ChatBubble;
