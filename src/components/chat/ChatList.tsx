import axios from 'axios';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Color from '../../constants/color';
import useOverlay from '../../hooks/overlay/useOverlay';
import { Room } from '../../types/interface';
import ChatRoomItem from '../ui/ChatRoomItem';
import Dialog from '../ui/Dialog';
import EmptyList from './EmptyList';

interface Props {
  rooms: Room[];
  handleRoomsDataUpdate: (rooms: Room[]) => void;
  isSwipable?: boolean;
}

const ChatList = ({
  rooms,
  handleRoomsDataUpdate,
  isSwipable = true,
}: Props) => {
  const rowRef = useRef<Swipeable | null>(null);

  const closeRow = () => {
    if (rowRef.current) {
      rowRef.current.close();
      rowRef.current = null;
    }
  };

  const overlay = useOverlay();

  const onPinPressHandler = async (id: string) => {
    try {
      const {
        data: { chatRoomList },
      } = await axios.patch(`/chat/pinned/${id}`);
      handleRoomsDataUpdate(chatRoomList);
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
                  handleRoomsDataUpdate(chatRoomList);
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
      handleRoomsDataUpdate(chatRoomList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          isSwipable={isSwipable}
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
  );
};

export default ChatList;
