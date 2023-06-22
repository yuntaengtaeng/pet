import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';
import Alarm from '../ui/icons/Alarm';
import Search from '../ui/icons/Search';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../store/atoms';
import ArrowDown from '../ui/icons/ArrowDown';
import ArrowUp from '../ui/icons/ArrowUp';
import ArrowSwap from '../ui/icons/ArrowSwap';
import { PetType } from '../../types/interface';
import useModal from '../../hooks/useModal';
import SHADOWS from '../ui/shadow';

interface Props {
  petType: PetType;
  togglePetType: () => void;
}

const Header = ({ petType, togglePetType }: Props) => {
  const { address } = useRecoilValue(UserState);
  const { isVisible, openModal, closeModal } = useModal();
  const [dropdownTop, setDropdownTop] = useState(0);

  const addressTextRef = useRef<Text | null>(null);

  const openModalHandler = () => {
    openModal();
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    addressTextRef.current?.measure((_x, _y, _width, height, pageX, pageY) => {
      setDropdownTop(pageY + height + 8);
    });
  }, [isVisible]);

  return (
    <View
      style={{
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.white,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
        onPress={togglePetType}
        style={styles.pressable}
      >
        <Text style={TYPOS.headline1}>{petType === 'dog' ? '🐶' : '😺'}</Text>
        <View style={styles.absoluteContainer}>
          <ArrowSwap size={16} color={Color.white} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[TYPOS.headline3]}
            onPress={openModalHandler}
            ref={addressTextRef}
          >
            {address}
          </Text>
          {isVisible ? (
            <ArrowUp size={16} style={{ marginLeft: 4 }} />
          ) : (
            <ArrowDown size={16} style={{ marginLeft: 4 }} />
          )}
        </View>
        <Modal visible={isVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={closeModal}>
            <View
              style={[
                {
                  flex: 1,
                  top: dropdownTop,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                },
                SHADOWS.shadow4,
              ]}
            >
              <Pressable
                onPress={() => {}}
                style={{
                  width: 146,
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Pressable>
                  <Text
                    style={[
                      TYPOS.body1,
                      { color: Color.neutral1, paddingVertical: 12 },
                    ]}
                  >
                    신림동
                  </Text>
                </Pressable>
                <Pressable>
                  <Text
                    style={[
                      TYPOS.body1,
                      { color: Color.neutral1, paddingVertical: 12 },
                    ]}
                  >
                    내 동네 설정
                  </Text>
                </Pressable>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Alarm size={24} />
        <Search size={24} />
      </View>
    </View>
  );
};

export default Header;

const styles = {
  pressable: {
    backgroundColor: Color.primary100,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  } as StyleProp<ViewStyle>,
  absoluteContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: Color.primary700,
    borderRadius: 50,
    right: -6,
    bottom: -6,
    borderWidth: 2,
    borderColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  } as StyleProp<ViewStyle>,
};
