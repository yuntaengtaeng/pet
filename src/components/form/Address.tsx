import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
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
import { useRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';
import axios from 'axios';
import Guide from './Address/Guide';
import Search from '../ui/icons/Search';
import useInputState from '../../hooks/useInputState';

interface Address extends LocationType {
  address: string;
}

interface Props {
  addressSelectHandler: ({
    location,
    address,
  }: {
    location: LocationType;
    address: string;
  }) => void;
}

const Address = ({ addressSelectHandler }: Props) => {
  const [location, setLocaion] = useState<LocationType | null>(null);
  const [nearbyAddressList, setNearbyAddressList] = useState<Address[]>([]);
  const [searchAddressList, setSearchAddressList] = useState<Address[]>([]);
  const [search, setSearch] = useInputState('');
  const [isPermissionError, setIsPermissionError] = useState<boolean>(false);
  const [isLoadingLocationInfo, setIsLoadingLocationInfo] = useState(true);
  const debouncedValue = useDebounce<string>(search, 600);
  const timeStamp = useRef('');
  const [isLoading, setIsLoading] = useRecoilState(LoadingState);
  const headerToShow = (() => {
    if (debouncedValue) {
      return !!searchAddressList.length ? `'${debouncedValue}' 검색 결과` : '';
    } else {
      return '주변 동네';
    }
  })();

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await Location.requestForegroundPermissionsAsync();

        if (response.status === 'granted') {
          const location = await Location.getCurrentPositionAsync();

          setLocaion({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        } else {
          setIsLoadingLocationInfo(false);
          // 권한이 거부되었을 때 처리할 내용 추가
        }
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
    } catch (error) {
    } finally {
      setIsLoadingLocationInfo(false);
    }
  };

  const getSearchAddress = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data, dataTimestamp },
      } = await axios.get(`/address?address=${search}`);
      if (dataTimestamp > timeStamp.current) {
        setSearchAddressList(data);
        timeStamp.current = dataTimestamp;
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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
          addressSelectHandler({
            location: {
              latitude: item.latitude,
              longitude: item.longitude,
            },
            address: item.address,
          });
        }}
      >
        <Text style={TYPOS.body1}>{item.address}</Text>
      </TouchableOpacity>
    );
  };

  const showBottomContent = (() => {
    if (isLoadingLocationInfo) {
      return (
        <Guide
          topText="주변 동네 정보를 불러오는 중입니다."
          bottomText="잠시만 기다려주세요."
        />
      );
    } else if (isPermissionError && !debouncedValue) {
      return (
        <Guide
          topText="현재 위치를 파악할 수 없습니다."
          bottomText="내 동네를 검색하여 등록하세요."
        />
      );
    } else {
      return (
        <FlatList
          contentContainerStyle={{ marginHorizontal: 16 }}
          ListHeaderComponent={
            <View>
              <Text style={TYPOS.headline4}>{headerToShow}</Text>
            </View>
          }
          data={!!debouncedValue ? searchAddressList : nearbyAddressList}
          renderItem={renderItem}
          keyExtractor={(item) => item.address}
          ListEmptyComponent={
            isLoading ? (
              <></>
            ) : (
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
                  검색 결과가 없습니다.
                </Text>
                <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
                  동네 이름을 다시 입력해주세요.
                </Text>
              </View>
            )
          }
        />
      );
    }
  })();

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
            onChangeHandler={setSearch}
            placeholder="동명(읍, 면)으로 검색 (ex. 신대방동)"
            leftIcon={(hasFocus) => {
              return (
                <Search
                  size={24}
                  {...(hasFocus && { color: Color.primary700 })}
                  style={{
                    marginLeft: 16,
                  }}
                />
              );
            }}
          />
        </View>
        {showBottomContent}
      </Container>
    </>
  );
};

export default Address;

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
