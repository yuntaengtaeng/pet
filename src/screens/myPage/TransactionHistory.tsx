import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Tabs from '../../components/ui/Tabs';
import { Product } from '../../types/interface';
import axios from 'axios';
import { FlatList } from 'react-native';
import ProductCard from '../../components/ui/ProductCard';
import AppBar from '../../components/ui/AppBar';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';
import EmptyList from '../../components/myPage/EmptyList';

export type TransactionHistoryScreenProps = StackScreenProps<
  RootStackParamList,
  'TransactionHistory'
>;

const TransactionHistory = ({
  navigation,
  route,
}: TransactionHistoryScreenProps) => {
  const [tap, setTap] = useState(0);
  const [salesList, setSalesList] = useState<Product[]>([]);
  const [purchaseList, setPurchaseList] = useState<Product[]>([]);
  const setIsLoading = useSetRecoilState(LoadingState);

  useEffect(() => {
    const getSalesList = () => {
      return axios.get<{ salesHistory: Product[] }>(
        '/board/used-item/sales-history'
      );
    };

    const getPurchaseList = () => {
      return axios.get<{ purchaseHistory: Product[] }>(
        '/board/used-item/purchase-history'
      );
    };

    const fetch = async () => {
      setIsLoading(true);
      try {
        const [sales, purchase] = await Promise.all([
          getSalesList(),
          getPurchaseList(),
        ]);

        setSalesList(sales.data.salesHistory);
        setPurchaseList(purchase.data.purchaseHistory);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [navigation]);

  const menu = [`판매 (${salesList.length})`, `구매 (${purchaseList.length})`];

  return (
    <>
      <AppBar title="거래내역" />
      <Tabs
        selectedIndex={tap}
        onSelectHandler={(index) => {
          setTap(index);
        }}
        menu={menu}
      />
      <FlatList
        style={{
          height: '100%',
        }}
        ListEmptyComponent={
          <EmptyList
            title="거래내역이 없어요."
            description="주변 이웃분들과 거래를 시작해보세요!"
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        data={tap === 0 ? [...salesList] : [...purchaseList]}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id}
            {...item}
            onPressHandler={() => {
              navigation.navigate('ProductDetail', {
                id: item.id,
              });
            }}
          />
        )}
      />
    </>
  );
};

export default TransactionHistory;
