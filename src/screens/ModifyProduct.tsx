import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import {
  ProductDetail as ProductDetailType,
  ProductModifyData,
} from '../types/interface';
import Product, { Data } from '../components/form/Product';
import * as MediaLibrary from 'expo-media-library';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import { generateImageIds } from '../utils';

export type ModifyProductProps = StackScreenProps<
  RootStackParamList,
  'ModifyProduct'
>;

const ModifyProduct = ({ navigation, route }: ModifyProductProps) => {
  const { id } = route.params;
  const [initValue, setInitValue] = useState<Data | null>(null);
  const setIsLoading = useSetRecoilState(LoadingState);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { editUsedItemBoardInfo },
      } = await axios.get<{ editUsedItemBoardInfo: ProductModifyData }>(
        `/board/used-item/edit/${id}`
      );

      const { title, subCategory, topCategory, images, description, price } =
        editUsedItemBoardInfo;

      setInitValue({
        petType: topCategory,
        category: subCategory,
        productName: title,
        images: generateImageIds(images),
        productDescription: description,
        productPrice: String(price),
        isFreeGiveaway: !price,
      });
    };

    fetch();
  }, [id]);

  if (!initValue) {
    return null;
  }

  const onSubmitHandler = async (data: Data) => {
    const formData = new FormData();
    formData.append('topCategory', data.petType);
    formData.append('subCategory', data.category);
    formData.append('title', data.productName);
    formData.append('description', data.productDescription);
    formData.append(
      'price',
      data.isFreeGiveaway ? '0' : data.productPrice.replace(/,/g, '')
    );

    const categorizedImages: {
      oldImage: string[];
      newImage: MediaLibrary.Asset[];
    } = {
      oldImage: [],
      newImage: [],
    };

    const { oldImage, newImage } = data.images.reduce((acc, cur) => {
      if ('filename' in cur) {
        acc.newImage.push(cur);
      } else {
        acc.oldImage.push(cur.uri);
      }

      return acc;
    }, categorizedImages);

    formData.append('images', JSON.stringify(oldImage));

    if (newImage.length) {
      for await (const photo of newImage) {
        const { localUri } = await MediaLibrary.getAssetInfoAsync(
          photo as MediaLibrary.Asset
        );
        formData.append('newItemImages', {
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
      } = await axios.put(`/board/used-item/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
      <Product initValue={initValue} onSubmitHandler={onSubmitHandler} />
    </>
  );
};

export default ModifyProduct;
