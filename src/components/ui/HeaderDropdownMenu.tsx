import { useRef } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import useMenuControl from '../../hooks/useMenuControl';
import ListValue from './dropdown/ListValue';
import MenuBackdrop from './dropdown/MenuBackdrop';

interface Menu {
  label: string;
  onClickHandler?: (label: string) => void;
}

interface Props {
  iconContainerStyle?: ViewStyle;
  icon: React.ReactNode;
  menus: Menu[];
}

const HeaderDropdownMenu = ({ iconContainerStyle, icon, menus }: Props) => {
  const iconParentRef = useRef<View | null>(null);
  const { isVisibleMenu, closeMenu, openMenu, menuTop } = useMenuControl({
    targetRef: iconParentRef,
  });

  return (
    <>
      <Pressable
        onPress={openMenu}
        ref={iconParentRef}
        style={iconContainerStyle}
      >
        {icon}
      </Pressable>
      <MenuBackdrop
        isVisible={isVisibleMenu && !!menuTop}
        close={() => {
          closeMenu();
        }}
        menuStyle={{ top: menuTop, width: 146, right: 16 }}
      >
        {menus.map((m) => (
          <ListValue
            key={m.label}
            label={m.label}
            onClickHandler={m.onClickHandler}
          />
        ))}
      </MenuBackdrop>
    </>
  );
};

export default HeaderDropdownMenu;
