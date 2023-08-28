import { useState, useEffect, RefObject } from 'react';
import { Dimensions, View } from 'react-native';
import useModal from './useModal';

interface Props<T extends View> {
  listLength?: number;
  targetRef: RefObject<T>;
}

const FULL_HEIGHT = Dimensions.get('window').height;
const SCROLL_VIEW_MAX_HEIGHT = 240;

const useMenuControl = <T extends View>({
  listLength = 0,
  targetRef,
}: Props<T>) => {
  const {
    isVisible: isVisibleMenu,
    closeModal: closeMenu,
    openModal: openMenu,
  } = useModal();
  const [menuTop, setMenuTop] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isVisibleMenu) {
      return;
    }

    targetRef.current?.measure((_x, _y, width, height, _pageX, pageY) => {
      setWidth(width);

      if (
        FULL_HEIGHT -
          (pageY +
            height +
            12 +
            Math.min(SCROLL_VIEW_MAX_HEIGHT, listLength * 48)) >
        10
      ) {
        setMenuTop(pageY + height + 12);
      } else {
        setMenuTop(
          pageY - Math.min(SCROLL_VIEW_MAX_HEIGHT, listLength * 48) - 12
        );
      }
    });
  }, [isVisibleMenu]);

  return { isVisibleMenu, closeMenu, openMenu, menuTop, width };
};

export default useMenuControl;
