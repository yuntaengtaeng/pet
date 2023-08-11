import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  TabNavigatorParamList,
} from '../../types/navigation';
import { FlatList, Text, View } from 'react-native';
import TYPOS from '../../components/ui/typo';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ChatRoomItem from '../../components/ui/ChatRoomItem';
import Color from '../../constants/color';
import EmptyList from '../../components/chat/EmptyList';

type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Chatting'>,
  StackNavigationProp<RootStackParamList>
>;

const dummy_data = [
  {
    roomId: '1',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
    isNotificationEnabled: true,
    isPinned: true,
  },
  {
    roomId: '2',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
  },
  {
    roomId: '3',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
    isNotificationEnabled: true,
  },
  {
    roomId: '4',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
    isNotificationEnabled: true,
  },
  {
    roomId: '5',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
    isNotificationEnabled: true,
  },
  {
    roomId: '6',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
    isNotificationEnabled: true,
  },
  {
    roomId: '7',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
  },
  {
    roomId: '8',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
  },
  {
    roomId: '9',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
  },
  {
    roomId: '10',
    roomName: '냥냥펀치',
    image:
      'https://petmily-images.s3.amazonaws.com/profileImages/dbsxo360@naver.com/dbsxo360@naver.com.jpeg',
    region: '신림동',
    timeStamp: '2주',
    content: '1주일 뒤에 공구 진행하겠습니다~~',
  },
];

const Chatting = () => {
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
        contentContainerStyle={{ ...(!dummy_data.length && { flex: 1 }) }}
        keyExtractor={(item) => item.roomId}
        data={dummy_data}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => <ChatRoomItem {...data.item} />}
        ListEmptyComponent={<EmptyList />}
      />
    </>
  );
};

export default Chatting;
