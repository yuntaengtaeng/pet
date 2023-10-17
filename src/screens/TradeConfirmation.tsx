import Container from '../components/layout/Container';
import Header from '../components/ui/Header';
import { Text, Pressable, View } from 'react-native';
import TYPOS from '../components/ui/typo';
import Color from '../constants/color';
import ProductInformation from '../components/chat/room/ProductInformation';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

export type TradeConfirmationScreenProps = StackScreenProps<
  RootStackParamList,
  'TradeConfirmation'
>;

const TradeConfirmation = ({
  navigation,
  route,
}: TradeConfirmationScreenProps) => {
  return (
    <>
      <Header
        rightContent={
          <Pressable
            onPress={() => {
              navigation.pop();
            }}
          >
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
          id={route.params.id}
          title={route.params.title}
          price={route.params.price}
          status={route.params.status}
          image={route.params.image}
        />
      </Container>
    </>
  );
};

export default TradeConfirmation;
