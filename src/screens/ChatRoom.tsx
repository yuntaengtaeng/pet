import React, { useContext, useEffect, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import TYPOS from '../components/ui/typo';
import AppBar from '../components/ui/AppBar';
import { View, Text, ScrollView, Pressable } from 'react-native';
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
import ListValue from '../components/ui/dropdown/ListValue';
import Bell16 from '../components/ui/icons/Bell16';
import MenuBackdrop from '../components/ui/dropdown/MenuBackdrop';
import useMenuControl from '../hooks/useMenuControl';
import axios from 'axios';
import { ToastDispatchContext } from '../components/ui/toast/ToastProvider';
import Dialog from '../components/ui/Dialog';
import useOverlay from '../hooks/overlay/useOverlay';

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
  const overlay = useOverlay();
  const toastDispatch = useContext(ToastDispatchContext);
  const socket = useContext(WebSocketContext);
  const { accessToken } = useRecoilValue(UserState);
  const { roomId } = route.params;
  const [chatData, setChatData] = useState<ChatData>({});
  const [headerData, setHeaderData] = useState<{
    nickname: string;
    region: string;
    isAlarm: boolean;
    id: string;
  }>({
    nickname: '',
    region: '',
    isAlarm: true,
    id: '',
  });

  const burgerRef = useRef<View | null>(null);
  const { isVisibleMenu, closeMenu, openMenu, menuTop } = useMenuControl({
    targetRef: burgerRef,
  });
  const target = useRef<string | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

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

    const handleGetAlarm = () => {
      socket.on('alarm', (data) => {
        setHeaderData({ ...headerData, isAlarm: data.data.isAlarm });
        toastDispatch?.showToastMessage(
          `채팅방 알림이 ${data.data.isAlarm ? '켜' : '꺼'}졌어요.`
        );
      });
    };

    handleGetChatList();
    handleGetAlarm();

    return () => {
      socket.off('chat-list');
      socket.off('alarm');
    };
  }, [socket, headerData]);

  useEffect(() => {
    const getHeaderData = async () => {
      try {
        const {
          data: { chatRoomHeaderInfo },
        } = await axios.get(`/chat/room/header?chatRoomId=${roomId}`);

        setHeaderData(chatRoomHeaderInfo);
      } catch (error) {}
    };

    if (roomId) {
      getHeaderData();
    }
  }, [roomId]);

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

  const onToggleAlarm = () => {
    if (!socket) {
      return;
    }

    socket.emit('alarm', {
      token: accessToken,
      chatRoomId: roomId,
    });
  };

  const onExit = () => {
    if (!socket) {
      return;
    }

    target.current = null;
    closeMenu();

    socket.emit('leave', {
      token: accessToken,
      chatRoomId: roomId,
    });

    navigation.pop();
  };

  useEffect(() => {
    if (!isVisibleMenu && target.current === 'blocked') {
      openBlockDialog();
    }
  }, [isVisibleMenu]);

  const openBlockDialog = () => {
    if (!socket) {
      return;
    }

    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content="채팅방을 나가면 대화 내용이 모두 삭제되며 복구할 수 없어요. 채팅방을 나갈까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '취소',
              onPressHandler: overlay.close,
            },
            {
              label: '나가기',
              onPressHandler: () => {
                overlay.close();
                socket.emit('blocked', {
                  token: accessToken,
                  blockedBy: headerData.id,
                });
                navigation.pop();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  const onBlock = () => {
    target.current = 'blocked';
    closeMenu();
  };

  return (
    <>
      <AppBar
        leftContent={
          <View>
            <Text style={[TYPOS.headline3, { color: Color.black }]}>
              {headerData.nickname}
              {!headerData.isAlarm && (
                <Bell16 color={Color.neutral2} style={{ marginLeft: 4 }} />
              )}
            </Text>
            <Text style={[TYPOS.body3, { color: Color.neutral1 }]}>
              {headerData.region}
            </Text>
          </View>
        }
        rightContent={
          <>
            <View>
              <Pressable
                onPress={openMenu}
                ref={burgerRef}
                style={{ marginLeft: 8 }}
              >
                <Burger24 color={Color.black} />
              </Pressable>
              <MenuBackdrop
                isVisible={isVisibleMenu && !!menuTop}
                close={() => {
                  target.current = null;
                  closeMenu();
                }}
                menuStyle={{ top: menuTop, width: 146, right: 16 }}
              >
                <ListValue
                  label={`알림${headerData.isAlarm ? '끄기' : '켜기'}`}
                  onClickHandler={onToggleAlarm}
                />
                <ListValue label="차단하기" onClickHandler={onBlock} />
                <ListValue label="나가기" onClickHandler={onExit} />
              </MenuBackdrop>
            </View>
          </>
        }
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
        ref={scrollViewRef}
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
