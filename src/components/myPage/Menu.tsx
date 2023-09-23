import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';

const MENU_MAP = [
  {
    title: '나의 거래',
    subMenu: ['관심 물품', '거래 물품'],
  },
  {
    title: '나의 메이트',
    subMenu: ['참여완료 리스트', '매칭 정보', '예정 모임'],
  },
];

const Menu = () => {
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
                <View
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
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Menu;
