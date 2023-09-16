import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TYPOS from '../ui/typo';
import Color from '../../constants/color';
import Settings24 from '../ui/icons/Settings24';
import useMenuControl from '../../hooks/useMenuControl';
import ListValue from '../ui/dropdown/ListValue';
import MenuBackdrop from '../ui/dropdown/MenuBackdrop';

const Header = () => {
  const settingRef = useRef<View | null>(null);
  const { isVisibleMenu, closeMenu, openMenu, menuTop } = useMenuControl({
    targetRef: settingRef,
  });

  return (
    <View style={styles.header}>
      <Text style={[TYPOS.headline3, { color: Color.black }]}>마이페이지</Text>
      <Pressable ref={settingRef} onPress={openMenu}>
        <Settings24 color={Color.neutral1} />
      </Pressable>
      <MenuBackdrop
        isVisible={isVisibleMenu && !!menuTop}
        close={() => {
          closeMenu();
        }}
        menuStyle={{ top: menuTop, width: 146, right: 16 }}
      >
        <ListValue label="알림설정" />
        <ListValue label="로그아웃" />
        <ListValue label="탈퇴하기" />
      </MenuBackdrop>
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
