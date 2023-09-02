import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import TYPOS from '../components/ui/typo';
import AppBar from '../components/ui/AppBar';
import { View, Text, ScrollView } from 'react-native';
import Color from '../constants/color';
import Burger24 from '../components/ui/icons/Burger24';
import DateDisplay from '../components/chat/room/DateDisplay';
import ChatBubble from '../components/ui/ChatBubble';
import Input from '../components/chat/room/Input';
import ProductInformation from '../components/chat/room/ProductInformation';
import { useRecoilValue } from 'recoil';
import { WebSocketContext } from '../components/WebSocketContainer';
import { UserState } from '../store/atoms';
import AppointmentNotification from '../components/chat/room/AppointmentNotification';

export type OnboardingScreenProps = StackScreenProps<
  RootStackParamList,
  'ChatRoom'
>;

type Message = {
  id: string;
  content: string;
};

type UserMessage = Message & {
  timestamp?: string;
  timeOfDay?: string;
  isMe?: boolean;
};

type System = Message & {
  id: string;
  content: string;
  promiseAt: string;
  isPromise: boolean;
};

type ObjectArray = Array<UserMessage | System>;

type ChatData = {
  [key: string]: ObjectArray;
};

const ChatRoom = ({ navigation, route }: OnboardingScreenProps) => {
  const socket = useContext(WebSocketContext);
  const { accessToken } = useRecoilValue(UserState);
  const { roomId } = route.params;
  const [chatData, setChatData] = useState<ChatData>({});

  useEffect(() => {
    if (!socket) return;

    const handleGetChatList = () => {
      socket.emit('chat-list', {
        token: accessToken,
        chatRoomId: roomId,
      });
      socket.on('chat-list', (data) => {
        setChatData(data.data.chatList);
      });
    };

    handleGetChatList();

    return () => {
      socket.off('chat-list');
    };
  }, [socket]);

  const onPostMessageHandler = (message: string) => {
    if (!socket || !message) {
      return;
    }

    socket.emit('message', {
      token: accessToken,
      chatRoomId: roomId,
      message,
    });
  };

  return (
    <>
      <AppBar
        leftContent={
          <View>
            <Text style={[TYPOS.headline3, { color: Color.black }]}>
              초코코
            </Text>
            <Text style={[TYPOS.body3, { color: Color.neutral1 }]}>역삼동</Text>
          </View>
        }
        rightContent={<Burger24 color={Color.black} />}
      />
      <ProductInformation
        id="test"
        name="강아지가 좋아하는 오리인형"
        price="15,000원"
        status="예약중"
        image="https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg"
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        {Object.entries(chatData).map(([date, children], i) => {
          const contents = children.map((child, index) => {
            if ('isPromise' in child) {
              const systemChild = child as System;

              return (
                <React.Fragment key={systemChild.id + index + 'Fragment'}>
                  <View
                    style={{ paddingTop: 16 }}
                    key={systemChild.id + index + 'up'}
                  />
                  <AppointmentNotification
                    key={systemChild.id}
                    timestamp={systemChild.promiseAt}
                    content={systemChild.content}
                  />
                  <View
                    style={{ paddingBottom: 16 }}
                    key={systemChild.id + index + 'down'}
                  />
                </React.Fragment>
              );
            } else {
              const messageChild = child as UserMessage;

              return (
                <React.Fragment key={messageChild.id + index + 'Fragment'}>
                  <ChatBubble
                    key={messageChild.id}
                    message={messageChild.content}
                    isSentByMe={!!messageChild.isMe}
                    {...(!!messageChild.timeOfDay &&
                      !!messageChild.timestamp && {
                        timeStamp: `${messageChild.timeOfDay} ${messageChild.timestamp}`,
                      })}
                  />
                  <View
                    style={{ paddingBottom: 4 }}
                    key={messageChild.id + index}
                  />
                </React.Fragment>
              );
            }
          });
          return (
            <React.Fragment key={date + i + 'Fragment'}>
              <View style={{ paddingTop: 16 }} key={date + i + 'up'} />
              <DateDisplay key={date} timestamp={date} />
              <View style={{ paddingBottom: 16 }} key={date + i + 'down'} />
              {contents}
            </React.Fragment>
          );
        })}
      </ScrollView>
      <Input onPostMessageHandler={onPostMessageHandler} />
    </>
  );
};

export default ChatRoom;
