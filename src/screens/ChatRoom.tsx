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
import { BlockStatus, ProductInfo } from '../types/interface';
import ComingAndGoingMessage from '../components/chat/room/ComingAndGoindMessage';
import AppointmentCancelMessage from '../components/ui/AppointmentCancelMessage';
import GroupMessage from '../components/ui/GroupMessage';

export type OnboardingScreenProps = StackScreenProps<
  RootStackParamList,
  'ChatRoom'
>;

interface User {
  nickname: string;
  profileImage?: string;
  isHost?: boolean;
}

interface MessageDetails {
  type:
    | 'usedTrade'
    | 'petMate'
    | 'schedule'
    | 'scheduleCancel'
    | 'comingAndGoing'
    | 'mateCancel';
  content: string;
  timestamp?: string;
  isMe?: boolean;
  user?: User;
}

interface Message {
  id: string;
  type: 'message' | 'action';
  details: MessageDetails;
}

type ChatData = {
  [key: string]: Message[];
};

interface HeaderData {
  title: string;
  region: string;
  isAlarm: boolean;
  id: string;
  type: 'usedTrade' | 'petMate';
  isDeleted?: boolean;
}

const ChatRoom = ({ navigation, route }: OnboardingScreenProps) => {
  const overlay = useOverlay();
  const toastDispatch = useContext(ToastDispatchContext);
  const socket = useContext(WebSocketContext);
  const { accessToken } = useRecoilValue(UserState);
  const { roomId } = route.params;
  const [chatData, setChatData] = useState<ChatData>({});
  const [headerData, setHeaderData] = useState<HeaderData>({
    title: '',
    region: '',
    isAlarm: true,
    id: '',
    type: 'usedTrade',
    isDeleted: false,
  });
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [blockStatus, setBlockStatus] = useState<BlockStatus>('None');

  const burgerRef = useRef<View | null>(null);
  const { isVisibleMenu, closeMenu, openMenu, menuTop } = useMenuControl({
    targetRef: burgerRef,
  });
  const nextAction = useRef<'blocked' | 'exit' | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  useEffect(() => {
    const getBlockStatus = async () => {
      try {
        const result = await axios.get<{ blockedStatus: BlockStatus }>(
          `/chat/blocked/user?chatRoomId=${roomId}`
        );

        setBlockStatus(result.data.blockedStatus);
      } catch (error) {}
    };

    getBlockStatus();
  }, []);

  const showChangeSalesStatusDialog = () => {
    if (!socket) {
      return;
    }

    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content="직거래 약속이 잡혔어요. 판매상태를 예약중으로 변경할까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '취소',
              onPressHandler: overlay.close,
            },
            {
              label: '변경하기',
              onPressHandler: () => {
                socket.emit('patch-used-item-status', {
                  token: accessToken,
                  chatRoomId: roomId,
                  status: '예약중',
                  usedItemBoardId: productInfo?.id,
                });

                overlay.close();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

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

    const handlerGetProductInfo = () => {
      socket.emit('get-chat/used-item', {
        token: accessToken,
        chatRoomId: roomId,
      });
      socket.on('get-chat/used-item', (data) => {
        setProductInfo(data.data.usedItemInfo);
      });
    };

    const handlerGetCreateSchedule = () => {
      socket.on('create-schedule', (data) => {
        showChangeSalesStatusDialog();
      });
    };

    const handlerGetBlockedStatus = () => {
      socket.on('blocked-status', (data) => {
        setBlockStatus(data.data.blockedStatus);
      });
    };

    handleGetChatList();
    handleGetAlarm();
    handlerGetProductInfo();
    handlerGetCreateSchedule();
    handlerGetBlockedStatus();

    return () => {
      socket.off('chat-list');
      socket.off('alarm');
      socket.off('get-chat/used-item');
      socket.off('create-schedule');
      socket.off('blocked-status');
    };
  }, [socket, headerData]);

  useEffect(() => {
    const getHeaderData = async () => {
      try {
        const {
          data: { chatRoomHeaderInfo },
        } = await axios.get<{ chatRoomHeaderInfo: HeaderData }>(
          `/chat/room/header?chatRoomId=${roomId}`
        );

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
    nextAction.current = 'exit';
    closeMenu();
  };

  const onBlock = () => {
    nextAction.current = 'blocked';
    closeMenu();
  };

  useEffect(() => {
    if (!isVisibleMenu) {
      openDialog();
    }
  }, [isVisibleMenu]);

  const openDialog = () => {
    if (nextAction.current === null || !socket) {
      return;
    }

    const [content, buttonLabel, buttonAction] = (() => {
      switch (nextAction.current) {
        case 'blocked':
          if (blockStatus === 'Me') {
            return [
              null,
              null,
              () => {
                socket.emit('unblock', {
                  token: accessToken,
                  chatRoomId: roomId,
                });
                toastDispatch?.showToastMessage(
                  `${headerData.title}님 차단을 해제했어요.`
                );
              },
            ];
          } else {
            return [
              '차단 시 펫친에서 삭제되고 더 이상 채팅을 할 수 없어요. 차단할까요?',
              '차단하기',
              () => {
                socket.emit('block', {
                  token: accessToken,
                  chatRoomId: roomId,
                });
                toastDispatch?.showToastMessage(
                  `${headerData.title}님을 차단을했어요.`
                );
              },
            ];
          }
        case 'exit':
          return [
            '채팅방을 나가면 대화 내용이 모두 삭제되며 복구할 수 없어요. 채팅방을 나갈까요?',
            '나가기',
            () => {
              socket.emit('leave', {
                token: accessToken,
                chatRoomId: roomId,
              });
              navigation.pop();
            },
          ];
      }
    })();

    if (content === null && buttonLabel === null) {
      buttonAction();
      return;
    }

    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content={content} />
        <Dialog.Buttons
          buttons={[
            {
              label: '취소',
              onPressHandler: overlay.close,
            },
            {
              label: buttonLabel,
              onPressHandler: () => {
                overlay.close();
                buttonAction();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  return (
    <>
      <AppBar
        leftContentStyle={{ flex: 1, flexDirection: 'column' }}
        leftContent={
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                numberOfLines={1}
                style={[TYPOS.headline3, { color: Color.black, flex: 1 }]}
              >
                {headerData.title}
              </Text>
              {headerData.isDeleted && (
                <Text style={[TYPOS.headline4, { color: Color.neutral3 }]}>
                  (삭제됨)
                </Text>
              )}
              {!headerData.isAlarm && (
                <Bell16 color={Color.neutral2} style={{ marginLeft: 4 }} />
              )}
            </View>
            <Text style={[TYPOS.body3, { color: Color.neutral1 }]}>
              {headerData.region}
            </Text>
          </>
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
                  nextAction.current = null;
                  closeMenu();
                }}
                menuStyle={{ top: menuTop, width: 146, right: 16 }}
              >
                {headerData.type === 'petMate' && (
                  <ListValue
                    label={`모임글 보기`}
                    onClickHandler={() => {
                      navigation.navigate('PetMateDetail', {
                        id: headerData.id,
                      });
                    }}
                  />
                )}
                <ListValue
                  label={`알림${headerData.isAlarm ? '끄기' : '켜기'}`}
                  onClickHandler={onToggleAlarm}
                />
                {headerData.type === 'usedTrade' && (
                  <ListValue
                    label={`차단${blockStatus !== 'Me' ? '하기' : ' 해제하기'}`}
                    onClickHandler={onBlock}
                  />
                )}
                <ListValue label="나가기" onClickHandler={onExit} />
              </MenuBackdrop>
            </View>
          </>
        }
      />
      {productInfo && (
        <ProductInformation
          id={productInfo.id}
          title={productInfo.title}
          price={productInfo.price}
          status={productInfo.status}
          image={productInfo.image}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        ref={scrollViewRef}
      >
        {Object.entries(chatData).map(([date, children], i) => {
          const contents = children.map((child, index) => {
            switch (child.details.type) {
              case 'usedTrade': {
                return (
                  <React.Fragment key={child.id + index + 'Fragment'}>
                    <ChatBubble
                      key={child.id}
                      message={child.details.content}
                      isSentByMe={!!child.details.isMe}
                      {...(!!child.details.timestamp && {
                        timeStamp: `${child.details.timestamp}`,
                      })}
                    />
                    <View style={{ paddingBottom: 4 }} key={child.id + index} />
                  </React.Fragment>
                );
              }

              case 'schedule': {
                return (
                  <React.Fragment key={child.id + index + 'Fragment'}>
                    <View
                      style={{ paddingTop: 16 }}
                      key={child.id + index + 'up'}
                    />
                    <AppointmentNotification
                      key={child.id}
                      timestamp={child.details.timestamp || ''}
                      content={child.details.content}
                      onModifyHandler={() => {
                        navigation.navigate('AppointmentScheduler', {
                          roomId,
                          type: 'MODIFY',
                          scheduleId: child.id,
                        });
                      }}
                      isEditButtonVisible={child.details.isMe}
                    />
                    <View
                      style={{ paddingBottom: 16 }}
                      key={child.id + index + 'down'}
                    />
                  </React.Fragment>
                );
              }

              case 'comingAndGoing': {
                return (
                  <React.Fragment key={child.id + index + 'Fragment'}>
                    <View
                      style={{ paddingTop: 24 }}
                      key={child.id + index + 'up'}
                    />
                    <ComingAndGoingMessage contents={child.details.content} />
                    <View
                      style={{ paddingBottom: 16 }}
                      key={child.id + index + 'down'}
                    />
                  </React.Fragment>
                );
              }

              case 'scheduleCancel': {
                return (
                  <React.Fragment key={child.id + index + 'Fragment'}>
                    <View
                      style={{ paddingTop: 24 }}
                      key={child.id + index + 'up'}
                    />
                    <AppointmentCancelMessage content={child.details.content} />
                    <View
                      style={{ paddingBottom: 16 }}
                      key={child.id + index + 'down'}
                    />
                  </React.Fragment>
                );
              }

              case 'petMate': {
                return (
                  <React.Fragment key={child.id + index + 'Fragment'}>
                    <GroupMessage
                      nickname={child.details.user?.nickname || ''}
                      profileImage={child.details.user?.profileImage}
                      isHost={child.details.user?.isHost}
                      key={child.id}
                      message={child.details.content}
                      isSentByMe={!!child.details.isMe}
                      {...(!!child.details.timestamp && {
                        timeStamp: `${child.details.timestamp}`,
                      })}
                    />
                    <View style={{ paddingBottom: 4 }} key={child.id + index} />
                  </React.Fragment>
                );
              }
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
      <Input
        blockStatus={blockStatus}
        onPostMessageHandler={onPostMessageHandler}
      />
    </>
  );
};

export default ChatRoom;
