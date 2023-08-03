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
import { LoadingState, UserState } from '../../store/atoms';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import ToastMessage from '../ui/toast/ToastMessage';
import useToastState from '../../hooks/useToastState';

interface Props {
  isVisibleBottomSheet: boolean;
}

/*
  legacy
  
  Modal 위에서 Toast를 띄울 수 없는 상황으로 ToastContainer의 기능을 사용하지 않고
  직접 ToastMessage 컴포넌트를 Modal 내부에서 랜더링 시키도록 구현
*/

const AddressBottomSheet = ({ isVisibleBottomSheet }: Props) => {
  const dispatch = useContext(HomeDispatchContext);
  const setIsLoading = useSetRecoilState(LoadingState);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useSetRecoilState(UserState);

  const [userAddressSettings, setUserAddressSettings] = useState<UserAddress[]>(
    []
  );

  const [toastState, showToastMessage] = useToastState();

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
      showToastMessage(`‘${address.address}’으로 변경되었습니다.`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (address: UserAddress) => {
    if (userAddressSettings.length === 1) {
      showToastMessage('동네는 최소 1개 이상 선택해야합니다.');
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
      showToastMessage(`‘${address.address}’이 삭제되었습니다.`);
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
            paddingHorizontal: 24,
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
                  dispatch?.bottomSheetController.close();
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
                <Plus size={24} color={Color.black} />
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
        {toastState.isVisible && <ToastMessage message={toastState.message} />}
      </BottomSheet>
    </>
  );
};

export default AddressBottomSheet;
