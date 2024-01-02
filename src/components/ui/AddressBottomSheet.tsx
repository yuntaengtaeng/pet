import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import Color from '../../constants/color';
import AddressLabel from './AddressLabel';
import BottomSheet, { BottomSheetRef } from './BottomSheet';
import Plus24 from './icons/Plus24';
import TYPOS from './typo';
import { UserAddress } from '../../types/interface';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { LoadingState, UserState } from '../../store/atoms';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

interface Props {
  isVisibleBottomSheet: boolean;
  onCloseHandler: () => void;
}

const AddressBottomSheet = ({
  isVisibleBottomSheet,
  onCloseHandler,
}: Props) => {
  const setIsLoading = useSetRecoilState(LoadingState);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useSetRecoilState(UserState);

  const [userAddressSettings, setUserAddressSettings] = useState<UserAddress[]>(
    []
  );

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const getUserAddressSettings = async () => {
    setIsLoading(true);

    try {
      const {
        data: { addressInfoList },
      } = await axios.get<{ addressInfoList: UserAddress[] }>(
        '/user/addresses/settings'
      );

      setUserAddressSettings(addressInfoList);
    } finally {
      setIsLoading(false);
    }
  };

  const selectAddress = async (address: UserAddress) => {
    setIsLoading(true);

    try {
      const {
        data: { addressInfoList, pickAddress },
      } = await axios.patch<{
        addressInfoList: UserAddress[];
        pickAddress: string;
      }>(`/user/addresses/${address.id}`);

      setUserAddressSettings(addressInfoList);
      setUser((prev) => ({ ...prev, address: pickAddress }));
      bottomSheetRef.current?.showToastMessage(
        `‘${address.address}’으로 변경되었습니다.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (address: UserAddress) => {
    if (userAddressSettings.length === 1) {
      bottomSheetRef.current?.showToastMessage(
        '동네는 최소 1개 이상 선택해야합니다.'
      );
      return;
    }

    if (address.isLastSelected) {
      bottomSheetRef.current?.showToastMessage(
        '선택된 동네는 삭제가 불가합니다.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { addressInfoList },
      } = await axios.delete<{ addressInfoList: UserAddress[] }>(
        `/user/addresses/${address.id}`
      );

      setUserAddressSettings(addressInfoList);
      bottomSheetRef.current?.showToastMessage(
        `‘${address.address}’이 삭제되었습니다.`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isVisibleBottomSheet) {
      setUserAddressSettings([]);
      return;
    }

    getUserAddressSettings();
  }, [isVisibleBottomSheet]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      isOpened={isVisibleBottomSheet}
      onClose={() => {
        onCloseHandler();
      }}
      title="동네 설정"
    >
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <View>
          {userAddressSettings.map((address) => (
            <AddressLabel
              isSelected={address.isLastSelected}
              key={address.id}
              address={address.address}
              style={{ marginBottom: 16 }}
              onPressHandler={() => {
                selectAddress(address);
              }}
              onClosePressHandler={() => {
                deleteAddress(address);
              }}
            />
          ))}
          {userAddressSettings.length < 2 && (
            <Pressable
              onPress={() => {
                onCloseHandler();
                navigation.navigate('AddressModify');
              }}
              style={[
                {
                  paddingVertical: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>
                추가하기
              </Text>
              <Plus24 color={Color.black} />
            </Pressable>
          )}

          <Text
            style={[
              TYPOS.body1,
              { color: Color.neutral2, textAlign: 'center', marginTop: 32 },
            ]}
          >
            최대 2개까지 설정할 수 있어요.
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default AddressBottomSheet;
