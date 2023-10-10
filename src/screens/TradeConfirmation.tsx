import Container from '../components/layout/Container';
import Header from '../components/ui/Header';
import { Text, Pressable, View } from 'react-native';
import TYPOS from '../components/ui/typo';
import Color from '../constants/color';
import ProductInformation from '../components/chat/room/ProductInformation';

const TradeConfirmation = () => {
  return (
    <>
      <Header
        rightContent={
          <Pressable>
            <Text style={[TYPOS.medium, { color: Color.neutral2 }]}>
              다음에 하기
            </Text>
          </Pressable>
        }
      />
      <Container>
        <View style={{ marginTop: 16, marginBottom: 32, marginHorizontal: 16 }}>
          <Text
            style={[TYPOS.headline1, { color: Color.black, marginBottom: 8 }]}
          >
            거래가 완료되었나요?
          </Text>
          <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
            거래가 끝났다면 판매상태를 변경해주세요.
          </Text>
        </View>
        <Text
          style={[
            TYPOS.headline4,
            { color: Color.black, marginBottom: 16, marginHorizontal: 16 },
          ]}
        >
          최근 거래 목록
        </Text>
        <ProductInformation
          id="test"
          name="강아지가 좋아하는 오리인형"
          price="15,000원"
          status="예약중"
          image="https://petmily-images.s3.amazonaws.com/usedItemImages/649193f013a61cf6c63e75cd/e1880e04-ebe5-47d4-86d3-21c60ed4dc0420230620205632"
        />
      </Container>
    </>
  );
};

export default TradeConfirmation;
