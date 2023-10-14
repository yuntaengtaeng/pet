import React, { useContext, useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import { FlatList, Text, View } from 'react-native';
import TYPOS from '../../components/ui/typo';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ChatRoomItem from '../../components/ui/ChatRoomItem';
import Color from '../../constants/color';
import EmptyList from '../../components/chat/EmptyList';
import { WebSocketContext } from '../../components/WebSocketContainer';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../store/atoms';
import axios from 'axios';
import useOverlay from '../../hooks/overlay/useOverlay';
import Dialog from '../../components/ui/Dialog';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../../components/ui/buttons/Button';

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Chatting'>,
  StackNavigationProp<RootStackParamList>
>;

interface RoomData {
  id: string;
  title: string;
  lastChat: string;
  lastChatAt: string;
  isAlarm: boolean;
  isPinned: boolean;
  isPetMate?: boolean;
  image?: string;
  region: string;
  productImage?: string;
}

const Chatting = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const socket = useContext(WebSocketContext);
  const rowRef = useRef<Swipeable | null>(null);

  const closeRow = () => {
    if (rowRef.current) {
      rowRef.current.close();
      rowRef.current = null;
    }
  };

  const { accessToken } = useRecoilValue(UserState);
  const overlay = useOverlay();

  useEffect(() => {
    if (!socket) return;

    const handleGetChatList = () => {
      socket.emit('room-list', {
        token: accessToken,
      });
      socket.on('room-list', ({ data: { chatRoomList } }) => {
        setRooms(chatRoomList);
      });
    };

    handleGetChatList();

    return () => {
      socket.off('room-list');
    };
  }, [socket]);

  const onPinPressHandler = async (id: string) => {
    try {
      const {
        data: { chatRoomList },
      } = await axios.patch(`/chat/pinned/${id}`);
      setRooms(chatRoomList);
    } catch (error) {
      console.log(error);
    }
  };

  const onExitPressHandler = async (id: string) => {
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
              onPressHandler: async () => {
                try {
                  const {
                    data: { chatRoomList },
                  } = await axios.patch(`/chat/leave/${id}`);
                  setRooms(chatRoomList);
                } catch (error) {
                  console.log(error);
                } finally {
                  overlay.close();
                }
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  const onToggleNotificationHandler = async (id: string) => {
    try {
      const {
        data: { chatRoomList },
      } = await axios.patch(`/chat/alarm/${id}`);
      setRooms(chatRoomList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: Color.white,
        }}
      >
        <Text style={[TYPOS.headline3, { color: Color.black }]}>채팅</Text>
      </View>
      <FlatList
        contentContainerStyle={{
          backgroundColor: Color.white,
          flex: 1,
        }}
        keyExtractor={(item) => item.id}
        data={rooms}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatRoomItem
            roomId={item.id}
            image={item.image}
            roomName={item.title}
            region={item.region}
            timeStamp={item.lastChatAt}
            content={item.lastChat}
            isPinned={item.isPinned}
            isNotificationEnabled={item.isAlarm}
            onPinPressHandler={() => {
              onPinPressHandler(item.id);
              closeRow();
              rowRef.current = null;
            }}
            onExitPressHandler={() => {
              onExitPressHandler(item.id);
              closeRow();
              rowRef.current = null;
            }}
            onToggleNotificationHandler={() => {
              onToggleNotificationHandler(item.id);
              closeRow();
              rowRef.current = null;
            }}
            setSwipeable={(ref) => {
              if (rowRef.current && ref !== rowRef.current) {
                closeRow();
              }
              rowRef.current = ref;
            }}
          />
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </>
  );
};

export default Chatting;
