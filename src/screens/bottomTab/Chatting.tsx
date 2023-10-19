import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import TYPOS from '../../components/ui/typo';
import Color from '../../constants/color';
import { WebSocketContext } from '../../components/WebSocketContainer';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../store/atoms';
import { Room } from '../../types/interface';
import ChatList from '../../components/chat/ChatList';

const Chatting = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
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
      <ChatList
        rooms={rooms}
        handleRoomsDataUpdate={(updateRooms) => {
          setRooms(updateRooms);
        }}
      />
    </>
  );
};

export default Chatting;
