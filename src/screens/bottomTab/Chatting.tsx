import React, { useContext, useEffect, useState } from 'react';
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

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Chatting'>,
  StackNavigationProp<RootStackParamList>
>;

interface RoomData {
  id: string;
  title: string;
  lastChat: string;
  lastChatAt: string;
  isAllam: boolean;
  isPinned: boolean;
  isPetMate?: boolean;
}

const Chatting = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const socket = useContext(WebSocketContext);
  const { accessToken } = useRecoilValue(UserState);

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
            image=""
            roomName={item.title}
            region={'신림동'}
            timeStamp={item.lastChatAt}
            content={item.lastChat}
            isPinned={item.isPinned}
            isNotificationEnabled={item.isAllam}
          />
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </>
  );
};

export default Chatting;
