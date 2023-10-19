import { StackScreenProps } from '@react-navigation/stack';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import ChatList from '../components/chat/ChatList';

export type ProductChattingProps = StackScreenProps<
  RootStackParamList,
  'ProductChatting'
>;

const ProductChatting = ({ navigation, route }: ProductChattingProps) => {
  return (
    <>
      <Header title="대화 중인 채팅" />
      <ChatList rooms={[]} handleRoomsDataUpdate={() => {}} />
    </>
  );
};

export default ProductChatting;
