import Header from '../../components/ui/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { Tap } from '../../components/form/Pet/TabSelector';
import * as MediaLibrary from 'expo-media-library';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';
import axios from 'axios';
import Pet, { Data } from '../../components/form/Pet';
import useOverlay from '../../hooks/overlay/useOverlay';
import Dialog from '../../components/ui/Dialog';

export type AddPetScreenProps = StackScreenProps<RootStackParamList, 'AddPet'>;

const AddPet = ({ navigation, route }: AddPetScreenProps) => {
  const { type } = route.params;
  const setIsLoading = useSetRecoilState(LoadingState);
  const overlay = useOverlay();

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

    if (data.petImages.length) {
      for await (const photo of data.petImages) {
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
      await axios.post('/user/pet', formData, {
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
      <Pet type={type} onSubmitHandler={onSubmit} />
    </>
  );
};

export default AddPet;
