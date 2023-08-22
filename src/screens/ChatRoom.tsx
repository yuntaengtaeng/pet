import React from 'react';
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

export type OnboardingScreenProps = StackScreenProps<
  RootStackParamList,
  'ChatRoom'
>;

const ChatRoom = ({ navigation, route }: OnboardingScreenProps) => {
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
          backgroundColor: Color.white,
          flex: 1,
        }}
      >
        <DateDisplay timestamp="2023년 2월 18일" />
        <ChatBubble
          message="안녕하세여"
          isSentByMe={true}
          timeStamp="오후 9:43"
        />
        <ChatBubble message="구매하고 싶은데" isSentByMe={true} />
        <ChatBubble
          message="택배거래도 하실까요?"
          isSentByMe={true}
          timeStamp="오후 9:44"
        />
        <ChatBubble message="안녕하세요~!" isSentByMe={false} />
        <ChatBubble
          message="가급적 직거래를 선호해서요. 혹시 어디쪽에 사시나요?"
          isSentByMe={false}
          timeStamp="오후 9:44"
        />
        <ChatBubble
          message="시간이 안되시면 택배거래도 가능합니다."
          isSentByMe={false}
          timeStamp="오후 9:45"
        />
      </ScrollView>
      <Input />
    </>
  );
};

export default ChatRoom;
