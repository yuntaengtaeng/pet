import React, { useEffect, useReducer, useState } from 'react';
import { View, Text } from 'react-native';
import Container from '../components/layout/Container';
import Header from '../components/ui/Header';
import InputField from '../components/ui/inputs/InputField';
import UiCheckbox from '../components/ui/UiCheckbox';
import TYPOS from '../components/ui/typo';
import Button from '../components/ui/buttons/Button';
import ChipContainer from '../components/ui/ChipContainer';
import TextArea from '../components/ui/inputs/TextArea';
import Dropdown from '../components/ui/dropdown/Dropdown';
import { useRecoilValue } from 'recoil';
import { UserState } from '../store/atoms';
import * as MediaLibrary from 'expo-media-library';
import { DOG_CATEGORY, CAT_CATEGORY } from '../constants/category';
import PhotoSelector from '../components/editProduct/PhotoSelector';
import Won from '../components/ui/icons/Won';
import Color from '../constants/color';

interface Data {
  petType: '강아지' | '고양이' | '전체';
  category: string;
  productName: string;
  images: MediaLibrary.Asset[];
  productDescription: string;
  isFreeGiveaway: boolean;
  productPrice: string;
}

const EditProduct = (): JSX.Element => {
  const user = useRecoilValue(UserState);
  const [category, setCategory] = useState<string[]>([]);

  const [data, updateData] = useReducer(
    (prev: Data, next: Partial<Data>) => {
      return { ...prev, ...next };
    },
    {
      petType: user.petType === 'cat' ? '고양이' : '강아지',
      category: '',
      productName: '',
      images: [],
      productDescription: '',
      isFreeGiveaway: false,
      productPrice: '',
    }
  );

  useEffect(() => {
    updateData({ category: '전체' });
    setCategory(data.petType === '강아지' ? DOG_CATEGORY : CAT_CATEGORY);
  }, [data.petType]);

  return (
    <>
      <Header title="중고거래 등록" />
      <Container style={{ paddingHorizontal: 16 }}>
        <View>
          <ChipContainer
            chipStyle={{ marginRight: 8 }}
            containerStyle={{ flexDirection: 'row', marginTop: 16 }}
            labels={['전체', '강아지', '고양이']}
            selectedLabel={data.petType}
            onSelectedHandler={(label: string) => {
              if (label) {
                updateData({ petType: label as '전체' | '강아지' | '고양이' });
              }
            }}
            type="single"
          />
          <Dropdown
            list={category}
            layoutStyle={{ marginTop: 24 }}
            selectedLabel={data.category}
            onLabelClickHandler={(label) => {
              updateData({ category: label });
            }}
          />
          <InputField
            placeholder="상품명"
            value={data.productName}
            layoutStyle={{ marginTop: 16 }}
            onChangeHandler={(value: string) => {
              updateData({ productName: value });
            }}
          />
          <PhotoSelector
            selectedPhotos={data.images}
            updatePhotos={(photos) => {
              updateData({ images: photos });
            }}
          />
          <TextArea
            placeholder="상품 설명을 작성해주세요."
            layoutStyle={{ marginTop: 24 }}
          />
          <InputField
            leftIcon={() => (
              <Won
                style={{
                  marginLeft: 16,
                }}
                size={24}
                color={data.isFreeGiveaway ? Color.neutral3 : Color.neutral1}
              />
            )}
            placeholder="0"
            keyboardType="number-pad"
            disabled={data.isFreeGiveaway}
            value={
              data.productPrice
                ? Number(data.productPrice.replace(/,/g, '')).toLocaleString()
                : ''
            }
            layoutStyle={{ marginTop: 16 }}
            onChangeHandler={(value: string) => {
              console.log(value);
              updateData({ productPrice: value });
            }}
          />
          <UiCheckbox
            style={{ marginTop: 16 }}
            isChecked={data.isFreeGiveaway}
            onValueChangeHandler={(isChecked) => {
              updateData({ isFreeGiveaway: isChecked });
            }}
          >
            <Text style={TYPOS.body2}>무료나눔</Text>
          </UiCheckbox>
        </View>
      </Container>
      <View style={{ paddingHorizontal: 16 }}>
        <Button
          label="등록하기"
          buttonType="primary"
          onPressHandler={() => {}}
        />
      </View>
    </>
  );
};

export default EditProduct;
