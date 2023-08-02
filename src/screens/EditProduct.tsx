import React, { useContext } from 'react';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Header from '../components/ui/Header';
import Product, { Data } from '../components/form/Product';
import * as MediaLibrary from 'expo-media-library';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import { ToastDispatchContext } from '../components/ui/toast/ToastProvider';

export type EditProductScreenProps = StackScreenProps<
  RootStackParamList,
  'EditProduct'
>;

const EditProduct = ({ navigation, route }: EditProductScreenProps) => {
  const setIsLoading = useSetRecoilState(LoadingState);
  const toastDispatch = useContext(ToastDispatchContext);

  const onSubmit = async (data: Data) => {
    const formData = new FormData();
    formData.append('topCategory', data.petType);
    formData.append('subCategory', data.category);
    formData.append('title', data.productName);
    formData.append('description', data.productDescription);
    formData.append(
      'price',
      data.isFreeGiveaway ? '0' : data.productPrice.replace(/,/g, '')
    );
    if (data.images) {
      for await (const photo of data.images) {
        const { localUri } = await MediaLibrary.getAssetInfoAsync(
          photo as MediaLibrary.Asset
        );
        formData.append('itemImages', {
          uri: localUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }
    }
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post('/board/used-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toastDispatch?.showToastMessage('거래가 등록되었습니다.');
      navigation.pop();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="중고거래 등록" />
      <Product onSubmitHandler={onSubmit} />
    </>
  );
};

export default EditProduct;
