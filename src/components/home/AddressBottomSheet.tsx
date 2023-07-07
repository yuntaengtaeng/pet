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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

interface Props {
  isVisibleBottomSheet: boolean;
}

const AddressBottomSheet = ({ isVisibleBottomSheet }: Props) => {
  const dispatch = useContext(HomeDispatchContext);
  const setIsLoading = useSetRecoilState(LoadingState);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
                  selectAddress(address.id);
                }}
                onClosePressHandler={() => {
                  deleteAddress(address.id);
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
      </BottomSheet>
    </>
  );
};

export default AddressBottomSheet;
