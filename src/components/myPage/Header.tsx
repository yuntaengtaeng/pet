import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TYPOS from '../ui/typo';
import Color from '../../constants/color';
import Settings24 from '../ui/icons/Settings24';
import HeaderDropdownMenu from '../ui/HeaderDropdownMenu';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={[TYPOS.headline3, { color: Color.black }]}>마이페이지</Text>
      <HeaderDropdownMenu
        icon={<Settings24 color={Color.neutral1} />}
        menus={[
          {
            label: '알림성정',
          },
          {
            label: '로그아웃',
          },
          {
            label: '탈퇴하기',
          },
        ]}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Color.white,
  },
});
