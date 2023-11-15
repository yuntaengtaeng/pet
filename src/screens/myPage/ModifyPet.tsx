import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import Pet, { Data } from '../../components/form/Pet';
import { Tap } from '../../components/form/Pet/TabSelector';
import Header from '../../components/ui/Header';
import { PetType } from '../../types/interface';
import { RootStackParamList } from '../../types/navigation';
import * as MediaLibrary from 'expo-media-library';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';
import { generateImageIds } from '../../utils';
import useOverlay from '../../hooks/overlay/useOverlay';
import Dialog from '../../components/ui/Dialog';

interface InitValue extends Data {
  speciesInputType: 'select' | 'input';
  type: PetType;
}

interface ModifyPetData extends Omit<InitValue, 'petImages' | 'birthday'> {
  birthday: string;
  images?: string[];
}

export type ModifyPetProps = StackScreenProps<RootStackParamList, 'ModifyPet'>;

const ModifyPet = ({ navigation, route }: ModifyPetProps) => {
  const { id } = route.params;
  const [initValue, setInitValue] = useState<InitValue | null>(null);
  const setIsLoading = useSetRecoilState(LoadingState);
  const overlay = useOverlay();

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { petInfo },
      } = await axios.get<{ petInfo: ModifyPetData }>(
        `/my-page/pet/edit?id=${id}`
      );

      const { images = [], birthday, weight, ...rest } = petInfo;
      const [year, month, day] = dayjs(birthday).format('YYYY M D').split(' ');

      setInitValue({
        ...rest,
        weight: String(weight),
        petImages: generateImageIds(images),
        birthday: {
          yyyy: `${year}년`,
          m: `${month}월`,
          d: `${day}일`,
        },
      });
    };

    fetch();
  }, [id]);

  if (!initValue) {
    return null;
  }

  const { type, speciesInputType, ...rest } = initValue;

  const onSubmit = async (data: Data, tap: Tap) => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('name', data.name);
    formData.append('speciesInputType', tap === 0 ? 'select' : 'input');
    formData.append('species', data.species);
    formData.append(
      'birthday',
      `${data.birthday.yyyy} ${data.birthday.m} ${data.birthday.d}`
    );
    formData.append('gender', data.gender);
    formData.append('neuteredStatus', data.neuteredStatus);
    formData.append('weight', data.weight);
    formData.append('unusualCondition', data.unusualCondition);
    formData.append('helloMessage', data.helloMessage);

    const categorizedImages: {
      oldImage: string[];
      newImage: MediaLibrary.Asset[];
    } = {
      oldImage: [],
      newImage: [],
    };

    const { oldImage, newImage } = data.petImages.reduce((acc, cur) => {
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
        formData.append('petImages', {
          uri: localUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }
    }

    setIsLoading(true);
    try {
      await axios.put(`/my-page/pet/${id}`, formData, {
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

  const onHeaderBackButtonHandler = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Title title="작성을 그만할까요?" />
        <Dialog.Content content="지금 닫으면 내용이 사라져요." />
        <Dialog.Buttons
          buttons={[
            {
              label: '네',
              onPressHandler: () => {
                overlay.close();
                navigation.pop();
              },
            },
            {
              label: '아니요',
              onPressHandler: () => {
                overlay.close();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  return (
    <>
      <Header
        title="반려동물 정보"
        onCustomBackButtonHandler={onHeaderBackButtonHandler}
      />
      <Pet
        type={type}
        onSubmitHandler={onSubmit}
        initTap={speciesInputType === 'select' ? 0 : 1}
        initValue={rest}
      />
    </>
  );
};

export default ModifyPet;
