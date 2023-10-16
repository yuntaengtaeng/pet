import ScrollContainer from '../../components/layout/ScrollContainer';
import Header from '../../components/ui/Header';
import PhotoSelector, {
  ImageType,
} from '../../components/form/Product/PhotoSelector';
import { View, Text } from 'react-native';
import TYPOS from '../../components/ui/typo';
import Color from '../../constants/color';
import InputField from '../../components/ui/inputs/InputField';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import RadioButtonGroup from '../../components/ui/radio/RadioButtonGroup';
import RadioButtonItem from '../../components/ui/radio/RadioButtonItem';
import TextArea from '../../components/ui/inputs/TextArea';
import TabSelector, { Tap } from '../../components/addPet/TabSelector';
import { useReducer, useState } from 'react';
import Button from '../../components/ui/buttons/Button';
import Label from '../../components/addPet/Label';
import SpeciesPicker from '../../components/addPet/SpeciesPicker';
import BirthdaySelector from '../../components/addPet/BirthdaySelector';
import { Date } from '../../types/interface';
import * as MediaLibrary from 'expo-media-library';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../../store/atoms';
import axios from 'axios';

export type AddPetScreenProps = StackScreenProps<RootStackParamList, 'AddPet'>;

type NeuteredStatus = '미완료' | '완료' | '모름';
type Gender = 'M' | 'F';

interface Data {
  petImages: ImageType[];
  name: string;
  birthday: Date;
  species: string;
  weight: string;
  gender: Gender;
  neuteredStatus: NeuteredStatus;
  unusualCondition: string;
  helloMessage: string;
}

const AddPet = ({ navigation, route }: AddPetScreenProps) => {
  const { type } = route.params;
  const setIsLoading = useSetRecoilState(LoadingState);

  const [tap, setTap] = useState<Tap>(0);
  const [data, updateData] = useReducer(
    (prev: Data, next: Partial<Data>) => {
      return { ...prev, ...next };
    },
    {
      petImages: [],
      name: '',
      birthday: {
        yyyy: '',
        m: '',
        d: '',
      },
      species: '',
      weight: '',
      gender: 'M',
      neuteredStatus: '미완료',
      unusualCondition: '',
      helloMessage: '',
    }
  );

  const onChange = (tap: Tap) => {
    setTap(tap);
  };

  const onSubmit = async () => {
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

  return (
    <>
      <Header title="반려동물 정보" />
      <ScrollContainer
        style={{ paddingHorizontal: 16, gap: 24, paddingBottom: 24 }}
      >
        <View>
          <PhotoSelector
            selectedPhotos={data.petImages}
            updatePhotos={(photos) => {
              updateData({ petImages: [...data.petImages, ...photos] });
            }}
            deletePhoto={(id) => {
              const clone = [...data.petImages];
              const findIndex = clone.findIndex((clone) => clone.id === id);
              if (findIndex !== -1) {
                clone.splice(findIndex, 1);
              }
              updateData({ petImages: clone });
            }}
          />
        </View>
        <View>
          <Label label="이름" required />
          <InputField
            placeholder="이름을 입력하세요."
            value={data.name}
            onChangeHandler={(value) => {
              updateData({ name: value });
            }}
          />
        </View>
        <View>
          <Label label={type === 'cat' ? '묘종' : '견종'} required />
          <TabSelector selectedTap={tap} onSelectedHandler={onChange} />
          <View style={{ marginTop: 16 }}></View>
          <SpeciesPicker
            petType={type}
            value={data.species}
            onChangeHandler={(value) => {
              updateData({ species: value });
            }}
            type={tap === 0 ? '목록에서 선택' : '직접 입력'}
          />
        </View>
        <View>
          <Label label="생년월일" required />
          <BirthdaySelector
            value={data.birthday}
            onChangeHandler={(date) => {
              updateData({ birthday: date });
            }}
          />
        </View>
        <View>
          <Label label="성별" />
          <RadioButtonGroup
            containerStyle={{ flexDirection: 'row', gap: 16 }}
            onSelected={(value) => {
              updateData({ gender: value as Gender });
            }}
            selected={data.gender}
          >
            <RadioButtonItem value="M">
              <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>남아</Text>
            </RadioButtonItem>
            <RadioButtonItem value="F">
              <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>여아</Text>
            </RadioButtonItem>
          </RadioButtonGroup>
        </View>
        <View>
          <Label label="중성화 여부" />
          <RadioButtonGroup
            containerStyle={{ flexDirection: 'row', gap: 16 }}
            onSelected={(value) => {
              updateData({ neuteredStatus: value as NeuteredStatus });
            }}
            selected={data.neuteredStatus}
          >
            <RadioButtonItem value="미완료">
              <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>
                미완료
              </Text>
            </RadioButtonItem>
            <RadioButtonItem value="완료">
              <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>완료</Text>
            </RadioButtonItem>
            <RadioButtonItem value="모름">
              <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>모름</Text>
            </RadioButtonItem>
          </RadioButtonGroup>
        </View>
        <View>
          <Label label="몸무게" />
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <InputField
              placeholder="몸무게를 입력하세요."
              layoutStyle={{ width: 184 }}
              keyboardType="decimal-pad"
              onChangeHandler={(value) => {
                updateData({ weight: value });
              }}
            />
            <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>kg</Text>
          </View>
        </View>
        <View>
          <Label label="특이사항" />
          <TextArea
            placeholder="특이사항을 입력하세요."
            fieldStyle={{ minHeight: 64 }}
            maxLength={50}
            value={data.unusualCondition}
            onChangeHandler={(value) => {
              updateData({ unusualCondition: value });
            }}
          />
        </View>
        <View>
          <Label label="인사말" />
          <TextArea
            placeholder="인사말을 입력하세요."
            fieldStyle={{ minHeight: 84 }}
            maxLength={100}
            value={data.helloMessage}
            onChangeHandler={(value) => {
              updateData({ helloMessage: value });
            }}
          />
        </View>
      </ScrollContainer>
      <View style={{ paddingHorizontal: 16 }}>
        <Button label="저장" buttonType="primary" onPressHandler={onSubmit} />
      </View>
    </>
  );
};

export default AddPet;
