import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import Color from '../../constants/color';
import AddressLabel from '../ui/AddressLabel';
import BottomSheet from '../ui/BottomSheet';
import Plus from '../ui/icons/Plus';
import TYPOS from '../ui/typo';
import { HomeDispatchContext } from './HomeDispatchContext';
import { UserAddress } from '../../types/interface';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';

interface Props {
  isVisibleBottomSheet: boolean;
}

const AddressBottomSheet = ({ isVisibleBottomSheet }: Props) => {
  const dispatch = useContext(HomeDispatchContext);
  const setIsLoading = useSetRecoilState(LoadingState);

  const [userAddressSettings, setUserAddressSettings] = useState<UserAddress[]>(
    []
  );

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

  const selectAddress = async (id: string) => {
    setIsLoading(true);

    try {
      const { data } = await axios.patch(`/user/addresses/${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    setIsLoading(true);

    try {
      const { data } = await axios.delete(`/user/addresses/${id}`);
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
    <>
      <BottomSheet
        isOpened={isVisibleBottomSheet}
        onClose={() => {
          dispatch?.bottomSheetController.close();
        }}
        height={360}
      >
        <View
          style={{
            paddingHorizontal: 16,
            width: '100%',
            height: '100%',
          }}
        >
          <View style={{ paddingVertical: 16 }}>
            <Text style={[TYPOS.headline3, { color: Color.black }]}>
              동네 설정
            </Text>
          </View>
          <View>
            {userAddressSettings.map((address) => (
              <AddressLabel
                isSelected={address.isLastSelected}
                key={address.id}
                address={address.address}
                style={{ marginBottom: 16 }}
                onPressHandler={() => {
                  selectAddress(address.id);
                }}
                onClosePressHandler={() => {
                  deleteAddress(address.id);
                }}
              />
            ))}
            <Pressable
              style={{
                padding: 16,
                borderWidth: 1,
                borderColor: Color.neutral2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <Plus
                size={24}
                color={Color.neutral2}
                style={{ marginRight: 8 }}
              />
              <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
                추가하기
              </Text>
            </Pressable>
            <Text
              style={[
                TYPOS.body1,
                { color: Color.neutral2, textAlign: 'center' },
              ]}
            >
              최대 2개까지 설정할 수 있어요.
            </Text>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default AddressBottomSheet;
