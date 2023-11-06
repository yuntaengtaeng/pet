import { useState, useReducer, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import {
  DOG_CATEGORY,
  CAT_CATEGORY,
  DEFAULT_CATEGORY,
} from '../../constants/category';
import Color from '../../constants/color';
import { UserState } from '../../store/atoms';
import ScrollContainer from '../layout/ScrollContainer';
import { ChipContainerView } from '../ui/ChipContainer';
import Dropdown from '../ui/dropdown/Dropdown';
import Won24 from '../ui/icons/Won24';
import InputField from '../ui/inputs/InputField';
import TextArea from '../ui/inputs/TextArea';
import TYPOS from '../ui/typo';
import UiCheckbox from '../ui/UiCheckbox';
import PhotoSelector from '../ui/PhotoSelector';
import Button from '../ui/buttons/Button';
import useModal from '../../hooks/useModal';
import Dialog from '../ui/Dialog';
import { ImageType } from '../../types/interface';

export interface Data {
  petType: '강아지' | '고양이' | '전체';
  category: string;
  productName: string;
  images: ImageType[];
  productDescription: string;
  isFreeGiveaway: boolean;
  productPrice: string;
}

interface Props {
  onSubmitHandler: (data: Data) => void;
  initValue?: Data;
}

const Product = ({ initValue, onSubmitHandler }: Props) => {
  const user = useRecoilValue(UserState);
  const [category, setCategory] = useState<string[]>([]);
  const [unfilledItems, setUnfilledItems] = useState<string[]>([]);
  const { isVisible, openModal, closeModal } = useModal();

  const [data, updateData] = useReducer(
    (prev: Data, next: Partial<Data>) => {
      return { ...prev, ...next };
    },
    {
      petType: initValue?.petType
        ? initValue?.petType
        : user.petType === 'cat'
        ? '고양이'
        : '강아지',
      category: initValue?.category || '',
      productName: initValue?.productName || '',
      images: initValue?.images || [],
      productDescription: initValue?.productDescription || '',
      isFreeGiveaway: initValue?.isFreeGiveaway || false,
      productPrice: initValue?.productPrice || '',
    }
  );

  const clampToMax = (inputPrice: string) => {
    const MAX = 100000000; // 1억

    if (inputPrice === '') {
      return inputPrice;
    }

    const stringToNumber = Number(inputPrice.replace(/,/g, ''));

    if (stringToNumber > MAX) {
      return String(MAX);
    }

    return String(stringToNumber);
  };

  useEffect(() => {
    updateData({ category: '' });
    const categories = (() => {
      switch (data.petType) {
        case '강아지':
          return [...DOG_CATEGORY];
        case '고양이':
          return [...CAT_CATEGORY];
        case '전체':
          return [...DEFAULT_CATEGORY];
      }
    })();
    categories.shift();
    setCategory(categories);
  }, [data.petType]);

  useEffect(() => {
    if (initValue?.category) {
      updateData({ category: initValue?.category });
    }
  }, [initValue?.category]);

  useEffect(() => {
    if (data.isFreeGiveaway) {
      updateData({ productPrice: '' });
    }
  }, [data.isFreeGiveaway]);

  const onSubmit = () => {
    const tempUnfilledItems: string[] = [];

    if (!data.category) {
      tempUnfilledItems.push('카테고리');
    }

    if (!data.productName) {
      tempUnfilledItems.push('상품명');
    }

    if (!data.productDescription) {
      tempUnfilledItems.push('내용');
    }

    const hasPrice = !!data.productPrice || data.isFreeGiveaway;

    if (!hasPrice) {
      tempUnfilledItems.push('가격');
    }

    if (tempUnfilledItems.length) {
      setUnfilledItems(tempUnfilledItems);
      openModal();
      return;
    }

    onSubmitHandler(data);
  };

  return (
    <>
      <ScrollContainer style={{ paddingHorizontal: 16 }}>
        <View>
          <ChipContainerView
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
            placeholder="카테고리"
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
              updateData({ images: [...data.images, ...photos] });
            }}
            deletePhoto={(id) => {
              const clone = [...data.images];
              const findIndex = clone.findIndex((clone) => clone.id === id);
              if (findIndex !== -1) {
                clone.splice(findIndex, 1);
              }
              updateData({ images: clone });
            }}
          />
          <TextArea
            placeholder="상품 설명을 작성해주세요."
            layoutStyle={{ marginTop: 24 }}
            fieldStyle={{ minHeight: 112 }}
            onChangeHandler={(value: string) => {
              updateData({ productDescription: value });
            }}
            value={data.productDescription}
          />
          <InputField
            leftIcon={() => (
              <Won24
                style={{
                  marginLeft: 16,
                }}
                color={data.isFreeGiveaway ? Color.neutral3 : Color.neutral1}
              />
            )}
            placeholder={data.isFreeGiveaway ? '0' : '가격을 입력해주세요'}
            keyboardType="number-pad"
            disabled={data.isFreeGiveaway}
            value={
              data.productPrice
                ? Number(data.productPrice.replace(/,/g, '')).toLocaleString()
                : ''
            }
            layoutStyle={{ marginTop: 16 }}
            onChangeHandler={(value: string) => {
              updateData({ productPrice: clampToMax(value) });
            }}
          />
          <UiCheckbox
            style={{ marginTop: 16 }}
            isChecked={data.isFreeGiveaway}
            onValueChangeHandler={(isChecked) => {
              updateData({ isFreeGiveaway: isChecked });
            }}
          >
            <Text style={TYPOS.body2}>무료 나눔</Text>
          </UiCheckbox>
        </View>
      </ScrollContainer>
      <View style={{ paddingHorizontal: 16 }}>
        <Button
          label="등록하기"
          buttonType="primary"
          onPressHandler={onSubmit}
        />
      </View>
      <Dialog isOpened={isVisible}>
        <Dialog.Content
          content={`${unfilledItems.join(', ')}은 필수로 입력해주세요.`}
        />
        <Dialog.Buttons
          buttons={[
            {
              label: '확인',
              onPressHandler: closeModal,
            },
          ]}
        />
      </Dialog>
    </>
  );
};

export default Product;
