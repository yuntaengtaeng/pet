import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoadingState, UserState } from '../../store/atoms';
import ArrowDown from '../ui/icons/ArrowDown';
import ArrowUp from '../ui/icons/ArrowUp';
import ArrowSwap from '../ui/icons/ArrowSwap';
import useModal from '../../hooks/useModal';
import SHADOWS from '../ui/shadow';
import { UserAddress } from '../../types/interface';
import axios from 'axios';
import { HomeDispatchContext } from './HomeDispatchContext';
import { HomeStateContext } from './HomeStateContext';

const Header = () => {
  const { address } = useRecoilValue(UserState);
  const { isVisible, openModal, closeModal } = useModal();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [userAddress, setUserAddress] = useState<UserAddress[]>([]);

  const setIsLoading = useSetRecoilState(LoadingState);

  const showBottomSheet = useRef<boolean>(false);
  const addressTextRef = useRef<Text | null>(null);

  const petType = useContext(HomeStateContext);
  const dispatch = useContext(HomeDispatchContext);

  const setUser = useSetRecoilState(UserState);

  const openModalHandler = () => {
    openModal();
  };

  const getUserAddress = async () => {
    setIsLoading(true);

    try {
      const {
        data: { addressInfoList },
      } = await axios.get<{ addressInfoList: UserAddress[] }>(
        '/user/addresses'
      );
      setUserAddress(addressInfoList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (!isVisible) {
      setUserAddress([]);
      if (showBottomSheet.current) {
        timer = setTimeout(() => {
          dispatch?.bottomSheetController.open();
        }, 300);
      }

      return;
    }

    addressTextRef.current?.measure((_x, _y, _width, height, pageX, pageY) => {
      setDropdownTop(pageY + height + 8);
    });

    getUserAddress();

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  const selectAddress = async (id: string) => {
    setIsLoading(true);

    try {
      const {
        data: { addressInfoList, pickAddress },
      } = await axios.patch<{
        addressInfoList: UserAddress[];
        pickAddress: string;
      }>(`/user/addresses/${id}`);

      setUserAddress(addressInfoList);
      setUser((prev) => ({ ...prev, address: pickAddress }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          onPress={dispatch?.togglePetType}
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
            <TouchableWithoutFeedback
              onPress={() => {
                showBottomSheet.current = false;
                closeModal();
              }}
            >
              <View
                style={[
                  {
                    flex: 1,
                    top: dropdownTop,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    backgroundColor: 'transparent',
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
                  {userAddress.map((address) => (
                    <Pressable
                      key={address.id}
                      onPress={() => {
                        selectAddress(address.id);
                      }}
                    >
                      <Text
                        style={[
                          TYPOS.body1,
                          {
                            color: address.isLastSelected
                              ? Color.primary700
                              : Color.neutral1,
                            paddingVertical: 12,
                          },
                        ]}
                      >
                        {address.address}
                      </Text>
                    </Pressable>
                  ))}
                  <Pressable
                    onPress={() => {
                      closeModal();
                      showBottomSheet.current = true;
                    }}
                  >
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
    </>
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
