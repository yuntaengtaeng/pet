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
import Bell24 from '../ui/icons/Bell24';
import Search24 from '../ui/icons/Search24';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoadingState, UserState } from '../../store/atoms';
import Down16 from '../ui/icons/Down16';
import Up16 from '../ui/icons/Up16';
import Swap16 from '../ui/icons/Swap16';
import useModal from '../../hooks/useModal';
import SHADOWS from '../ui/shadow';
import { UserAddress } from '../../types/interface';
import axios from 'axios';
import { HomeDispatchContext } from './HomeDispatchContext';
import { HomeStateContext } from './HomeStateContext';
import ListValue from '../ui/dropdown/ListValue';
import { ToastDispatchContext } from '../ui/toast/ToastProvider';

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
  const toastDispatch = useContext(ToastDispatchContext);

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

  const selectAddress = async (address: UserAddress) => {
    setIsLoading(true);

    try {
      const {
        data: { addressInfoList, pickAddress },
      } = await axios.patch<{
        addressInfoList: UserAddress[];
        pickAddress: string;
      }>(`/user/addresses/${address.id}`);

      setUserAddress(addressInfoList);

      toastDispatch?.showToastMessage(
        `‘${address.address}’으로 변경되었습니다.`
      );
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
            <Swap16 color={Color.white} />
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
              <Up16 color={Color.black} style={{ marginLeft: 4 }} />
            ) : (
              <Down16 color={Color.black} style={{ marginLeft: 4 }} />
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
                  }}
                >
                  {userAddress.map((address) => (
                    <ListValue
                      label={address.address}
                      key={address.id}
                      isActive={address.isLastSelected}
                      onClickHandler={() => {
                        selectAddress(address);
                      }}
                    />
                  ))}
                  <ListValue
                    label="내 동네 설정"
                    onClickHandler={() => {
                      closeModal();
                      showBottomSheet.current = true;
                    }}
                  />
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Bell24 color={Color.black} />
          <Search24 color={Color.black} />
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
