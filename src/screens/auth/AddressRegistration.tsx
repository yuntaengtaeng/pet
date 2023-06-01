import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Container from '../../components/layout/Container';
import Header from '../../components/ui/Header';
import InputField from '../../components/ui/inputs/InputField';
import TYPOS from '../../components/ui/typo';
import * as Location from 'expo-location';
import useDebounce from '../../hooks/useDebounce';
import Color from '../../constants/color';
import { Location as LocationType } from '../../types/interface';
import axios from 'axios';

export type AddressRegistrationScreenProps = StackScreenProps<
  RootStackParamList,
  'AddressRegistration'
>;

interface Address extends LocationType {
  address: string;
}

const AddressRegistration = ({
  navigation,
  route,
}: AddressRegistrationScreenProps) => {
  const [location, setLocaion] = useState<LocationType | null>(null);
  const [nearbyAddressList, setNearbyAddressList] = useState<Address[]>([]);
  const [searchAddressList, setSearchAddressList] = useState<Address[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isPermissionError, setIsPermissionError] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(search, 600);
  const { email } = route.params;

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await Location.requestForegroundPermissionsAsync();
        console.log('response');
        console.log(response);

        //TODO 허용 시에만 요청하도록 변경
        const location = await Location.getCurrentPositionAsync();

        setLocaion({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
      } catch (error) {
        setIsPermissionError(true);
        console.log(error);
      }
    };

    getLocation();
  }, []);

  const getNearbyAddress = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `/address/nearby?longitude=${location?.longitude}&latitude=${location?.latitude}`
      );

      setNearbyAddressList(data);
    } catch (error) {}
  };

  const getSearchAddress = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`/address?address=${search}`);

      setSearchAddressList(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (debouncedValue) {
      getSearchAddress();
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (location) {
      getNearbyAddress();
    }
  }, [location]);

  const renderItem = ({ item }: { item: Address }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.push('FillProfile', {
            location: {
              latitude: item.latitude,
              longitude: item.latitude,
            },
            address: item.address,
            email: email as string,
          });
        }}
      >
        <Text style={TYPOS.body1}>{item.address}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header />
      <Container>
        <View style={styles.fixed}>
          <Text style={TYPOS.headline1}>우리 동네를 선택해주세요.</Text>
          <Text style={[TYPOS.body1, styles.fixedCenterItem]}>
            아래 목록에 없다면 검색해주세요.
          </Text>
          <InputField
            onChangeHandler={(value: string) => {
              setSearch(value);
            }}
            isSearch={true}
            placeholder="동명(읍, 면)으로 검색 (ex. 신대방동)"
          />
        </View>
        {isPermissionError && !debouncedValue ? (
          <View>
            <Text style={TYPOS.headline4}>
              현재 위치를 파악할 수 없습니다. 내 동네를 검색하여 등록하세요.
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ marginHorizontal: 16 }}
            ListHeaderComponent={
              <View>
                <Text style={TYPOS.headline4}>
                  {!!debouncedValue
                    ? `'${debouncedValue}' 검색 결과`
                    : '주변 동네'}
                </Text>
              </View>
            }
            data={!!debouncedValue ? searchAddressList : nearbyAddressList}
            renderItem={renderItem}
            keyExtractor={(item) => item.address}
            ListEmptyComponent={
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
                  검색 결과가 없습니다.
                </Text>
                <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
                  동네 이름을 다시 입력해주세요.
                </Text>
              </View>
            }
          />
        )}
      </Container>
    </>
  );
};

export default AddressRegistration;

const styles = StyleSheet.create({
  fixed: {
    margin: 16,
  },
  fixedCenterItem: {
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Color.neutral5,
  },
});
