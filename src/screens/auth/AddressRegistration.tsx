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

export type AddressRegistrationScreenProps = StackScreenProps<
  RootStackParamList,
  'AddressRegistration'
>;

const data = [
  { label: '서울 강남구 삼성1동', latitude: 37, longitude: 125 },
  { label: '서울 강남구 삼성2동', latitude: 37, longitude: 125 },
  { label: '서울 강남구 논현동', latitude: 37, longitude: 125 },
  { label: '서울 강남구 논현2동', latitude: 37, longitude: 125 },
  { label: '서울 강남구 청담동', latitude: 37, longitude: 125 },
  { label: '서울 강남구 대치동', latitude: 37, longitude: 125 },
  { label: '서울 강남구 대치2동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 삼성1동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 삼성2동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 논현동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 논현2동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 청담동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 대치동', latitude: 37, longitude: 125 },
  { label: '서울 도봉구 대치2동', latitude: 37, longitude: 125 },
];

const AddressRegistration = ({
  navigation,
  route,
}: AddressRegistrationScreenProps) => {
  const [location, setLocaion] = useState<LocationType>();
  const [search, setSearch] = useState<string>('');
  const [isPermissionError, setIsPermissionError] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(search, 500);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await Location.requestForegroundPermissionsAsync();
        console.log(response);
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
      } catch (error) {
        setIsPermissionError(true);
        console.log(error);
      }
    };

    getLocation();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.push('FillProfile', {
            location: {
              latitude: item.latitude,
              longitude: item.latitude,
            },
            address: item.label,
          });
        }}
      >
        <Text style={TYPOS.body1}>{item.label}</Text>
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
                <Text style={TYPOS.headline4}>주변 동네</Text>
              </View>
            }
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.label}
            ListEmptyComponent={
              <View>
                <Text style={TYPOS.headline4}>
                  검색 결과가 없습니다. 동네 이름을 다시 입력해주세요.
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
