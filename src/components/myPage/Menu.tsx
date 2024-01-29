import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Pressable } from 'react-native';
import Color from '../../constants/color';
import { RootStackParamList } from '../../types/navigation';
import TYPOS from '../ui/typo';

type Title = '나의 거래' | '나의 메이트';
type SubMenu = '거래 내역' | '관심 물품' | '내 모임' | '차단 관리';

type Menu = {
  title: Title;
  subMenu: SubMenu[];
};

const MENU_MAP: Menu[] = [
  {
    title: '나의 거래',
    subMenu: ['거래 내역', '관심 물품'],
  },
  {
    title: '나의 메이트',
    subMenu: ['내 모임', '차단 관리'],
  },
];

const Menu = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPressHandler = (target: SubMenu) => {
    switch (target) {
      case '거래 내역':
        navigation.navigate('TransactionHistory');
        break;
      case '관심 물품':
        navigation.navigate('FavoriteProducts');
        break;
      case '내 모임':
        navigation.navigate('MyMate');
        break;
      case '차단 관리':
        navigation.navigate('BlockManagement');
        break;
    }
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      {MENU_MAP.map((item) => {
        return (
          <View key={item.title} style={{ marginTop: 40 }}>
            <Text style={[TYPOS.headline4, { color: Color.black }]}>
              {item.title}
            </Text>
            <View>
              {item.subMenu.map((sub) => (
                <Pressable
                  onPress={() => {
                    onPressHandler(sub);
                  }}
                  key={sub}
                  style={{
                    height: 55,
                    borderBottomColor: Color.neutral5,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>
                    {sub}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Menu;
