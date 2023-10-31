import { useReducer, useState } from 'react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import BirthdaySelector from './Pet/BirthdaySelector';
import Label from './Pet/Label';
import SpeciesPicker from './Pet/SpeciesPicker';
import TabSelector, { Tap } from './Pet/TabSelector';
import ScrollContainer from '../layout/ScrollContainer';
import InputField from '../ui/inputs/InputField';
import TextArea from '../ui/inputs/TextArea';
import RadioButtonGroup from '../ui/radio/RadioButtonGroup';
import RadioButtonItem from '../ui/radio/RadioButtonItem';
import TYPOS from '../ui/typo';
import PhotoSelector, { ImageType } from './Product/PhotoSelector';
import { Date, PetType } from '../../types/interface';
import Button from '../ui/buttons/Button';

type NeuteredStatus = '미완료' | '완료' | '모름';
type Gender = 'M' | 'F';

export interface Data {
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

interface Props {
  type: PetType;
  onSubmitHandler: (data: Data, tap: Tap) => void;
  initValue?: Data;
  initTap?: Tap;
}

const Pet = ({ type, onSubmitHandler, initValue, initTap }: Props) => {
  const [tap, setTap] = useState<Tap>(initTap || 0);

  const [data, updateData] = useReducer(
    (prev: Data, next: Partial<Data>) => {
      return { ...prev, ...next };
    },
    {
      petImages: initValue?.petImages || [],
      name: initValue?.name || '',
      birthday: {
        yyyy: initValue?.birthday.yyyy || '',
        m: initValue?.birthday.m || '',
        d: initValue?.birthday.d || '',
      },
      species: initValue?.species || '',
      weight: initValue?.weight || '',
      gender: initValue?.gender || 'M',
      neuteredStatus: initValue?.neuteredStatus || '미완료',
      unusualCondition: initValue?.unusualCondition || '',
      helloMessage: initValue?.helloMessage || '',
    }
  );

  const [isInputErrors, setIsInputErrors] = useState({
    unusualCondition: false,
    helloMessage: false,
  });

  const onChange = (tap: Tap) => {
    setTap(tap);
  };

  const onSubmit = () => {
    onSubmitHandler(data, tap);
  };

  return (
    <>
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
              value={data.weight}
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
            errorMessage="최대 글자 수를 초과했어요."
            isError={isInputErrors.unusualCondition}
            onChangeHandler={(value) => {
              setIsInputErrors((prev) => ({
                ...prev,
                unusualCondition: value.length > 50,
              }));
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
            errorMessage="최대 글자 수를 초과했어요."
            value={data.helloMessage}
            isError={isInputErrors.helloMessage}
            onChangeHandler={(value) => {
              setIsInputErrors((prev) => ({
                ...prev,
                helloMessage: value.length > 100,
              }));
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

export default Pet;
