import { StackScreenProps } from '@react-navigation/stack';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import ChatList from '../components/chat/ChatList';
import { useState, useContext, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { WebSocketContext } from '../components/WebSocketContainer';
import { UserState } from '../store/atoms';
import { Room } from '../types/interface';

export type ProductChattingProps = StackScreenProps<
  RootStackParamList,
  'ProductChatting'
>;

const ProductChatting = ({ navigation, route }: ProductChattingProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const socket = useContext(WebSocketContext);
  const { id } = route.params;

  const { accessToken } = useRecoilValue(UserState);

  useEffect(() => {
    if (!socket) return;

    const handleGetChatList = () => {
      socket.emit('room-list', {
        token: accessToken,
        boardId: id,
      });
      socket.on('room-list', ({ data: { chatRoomList } }) => {
        setRooms(chatRoomList);
      });
    };

    handleGetChatList();

    return () => {
      socket.off('room-list');
    };
  }, [socket, id]);

  return (
    <>
      <Header title="대화 중인 채팅" />
      <ChatList
        rooms={rooms}
        handleRoomsDataUpdate={() => {}}
        isSwipable={false}
      />
    </>
  );
};

export default ProductChatting;
