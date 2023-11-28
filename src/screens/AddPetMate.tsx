import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import ScrollContainer from '../components/layout/ScrollContainer';
import Header from '../components/ui/Header';
import Selectable from '../components/ui/Selectable';
import InputField from '../components/ui/inputs/InputField';
import TextArea from '../components/ui/inputs/TextArea';
import { View } from 'react-native';
import Accordion from '../components/ui/Accordion';
import Calendar24 from '../components/ui/icons/Calendar24';
import Color from '../constants/color';
import Calendar from '../components/ui/Calender';
import Time24 from '../components/ui/icons/Time24';
import Location24 from '../components/ui/icons/Location24';
import Count from '../components/form/PetMate/Count';
import Button from '../components/ui/buttons/Button';
import useModal from '../hooks/useModal';
import Line from '../components/form/PetMate/Line';
import NonCollapsibleAccordion from '../components/form/PetMate/NonCollapsibleAccordion';
import { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import { Pet } from '../types/interface';
import useOverlay from '../hooks/overlay/useOverlay';
import Dialog from '../components/ui/Dialog';
import dayjs from 'dayjs';
import BottomSheet from '../components/ui/BottomSheet';
import TimePicker from '../components/ui/TimePicker';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import PetSelectBottomSheet from '../components/ui/PetSelectBottomSheet';

export type AddPetMateScreenProps = StackScreenProps<
  RootStackParamList,
  'AddPetMate'
>;

interface WalkDate {
  date: string;
  time: {
    ampm: string;
    hour: string;
    minute: string;
  };
}

export interface Data {
  pets: Pet[];
  title: string;
  content: string;
  walkDate: WalkDate;
  place: string;
  maxPet: number;
}

const AddPetMate = ({ navigation, route }: AddPetMateScreenProps) => {
  const { isVisible, openModal, closeModal } = useModal();
  const {
    isVisible: isTimeVisible,
    openModal: openTimeBottomSheet,
    closeModal: closeTimeBottomSheet,
  } = useModal();
  const overlay = useOverlay();
  const shouldSetInitialCalenderValue = useRef(true);
  const setIsLoading = useSetRecoilState(LoadingState);

  const [data, updateData] = useReducer(
    (prev: Data, next: Partial<Data>) => {
      return { ...prev, ...next };
    },
    {
      pets: [],
      title: '',
      content: '',
      walkDate: {
        date: '',
        time: {
          ampm: '',
          hour: '',
          minute: '',
        },
      },
      place: '',
      maxPet: 0,
    }
  );

  useEffect(() => {
    const getPetList = async () => {
      const result = await axios.get<{ pets: Pet[] }>('/my-page/pets');
      const findDog = result.data.pets.find((v) => v.type === '강아지');

      if (!findDog) {
        overlay.open(
          <Dialog isOpened={true}>
            <Dialog.Title title="등록된 반려동물 정보가 없습니다." />
            <Dialog.Content content="함께할 반려동물 정보를 등록하고 산책 메이트를 모집해보세요." />
            <Dialog.Buttons
              buttons={[
                {
                  label: '닫기',
                  onPressHandler: () => {
                    overlay.close();
                    navigation.pop();
                  },
                },
                {
                  label: '정보 등록',
                  onPressHandler: () => {
                    overlay.close();
                    navigation.push('AddPet', { type: 'dog' });
                  },
                },
              ]}
            />
          </Dialog>
        );
      }
    };

    getPetList();
  }, []);

  const selectedPetName = data.pets.map((pet) => pet.name).join(', ');

  const createDate = (): Date => {
    const { date, time } = { ...data.walkDate };
    const { ampm, hour, minute } = time;

    const formattedDate = dayjs(date)
      .set('hour', parseInt(hour, 10))
      .set('minute', parseInt(minute, 10))
      .set('second', 0)
      .set('millisecond', 0);

    if (ampm === 'PM') {
      formattedDate.add(12, 'hour');
    }

    return formattedDate.toDate();
  };

  const onSubmit = async () => {
    const walkDate = createDate();

    const body = {
      petIds: data.pets.map((pet) => pet.id),
      title: data.title,
      content: data.content,
      place: data.place,
      maxPet: data.maxPet,
      walkDate,
    };

    setIsLoading(true);
    try {
      await axios.post('/board/pet-mate', {
        ...body,
      });
      navigation.pop();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="산책 메이트 모집" />
      <ScrollContainer>
        <View style={{ marginHorizontal: 16, gap: 16, marginBottom: 24 }}>
          <Selectable
            placeholder="함께할 반려견"
            onPressHandler={openModal}
            value={selectedPetName}
          />
          <InputField
            placeholder="메이트들과 어디서 산책하고 싶은가요?"
            value={data.title}
            onChangeHandler={(value) => {
              updateData({ title: value });
            }}
          />
          <TextArea
            value={data.content}
            onChangeHandler={(value) => {
              updateData({ content: value });
            }}
            fieldStyle={{ height: 144 }}
            placeholder="함께하고 싶은 견종, 지켜야할 규칙 등 자유롭게 적어주세요."
          />
        </View>
        <Accordion
          title={
            !!data.walkDate.date
              ? `${dayjs(data.walkDate.date).format('MM.DD (ddd)')}`
              : '산책 날짜'
          }
          titleActive={!!data.walkDate.date}
          titleIcon={<Calendar24 color={Color.neutral1} />}
          onToggleHandler={(isClose) => {
            if (!isClose && shouldSetInitialCalenderValue) {
              updateData({
                walkDate: {
                  ...data.walkDate,
                  date: dayjs().format('YYYYMMDD'),
                },
              });
              shouldSetInitialCalenderValue.current = false;
            }
          }}
        >
          <Calendar
            endDateData={{ value: 1, unit: 'month' }}
            selectedDate={data.walkDate.date}
            onSelectDateChangeHandler={(date) => {
              updateData({
                walkDate: {
                  ...data.walkDate,
                  date,
                },
              });
            }}
          />
        </Accordion>
        <Line marginHorizontal={16} />
        <NonCollapsibleAccordion
          title={
            !!data.walkDate.time.ampm
              ? `${data.walkDate.time.ampm} ${data.walkDate.time.hour}:${data.walkDate.time.minute}`
              : '시간'
          }
          titleActive={!!data.walkDate.time.ampm}
          titleIcon={<Time24 color={Color.neutral1} />}
          onPressHandler={() => {
            openTimeBottomSheet();
          }}
        />
        <Line marginHorizontal={16} />
        <Accordion
          title={data.place || '장소'}
          titleActive={!!data.place}
          titleIcon={<Location24 color={Color.neutral1} />}
        >
          <View style={{ marginVertical: 16, marginHorizontal: 24 }}>
            <InputField
              placeholder="산책하실 장소를 입력하세요."
              value={data.place}
              onChangeHandler={(value) => {
                updateData({ place: value });
              }}
            />
          </View>
        </Accordion>
        <Line marginHorizontal={16} />
        <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
          <Count
            count={data.maxPet}
            max={10}
            min={0}
            onPlusHandler={() => {
              updateData({ maxPet: ++data.maxPet });
            }}
            onMinusHandler={() => {
              updateData({ maxPet: --data.maxPet });
            }}
          />
        </View>
      </ScrollContainer>
      <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
        <Button label="등록" onPressHandler={onSubmit} />
      </View>
      <PetSelectBottomSheet
        isVisible={isVisible}
        onClose={closeModal}
        successButtonHandler={(pets) => {
          updateData({ pets: pets });
        }}
        selectedPets={data.pets}
      />
      <BottomSheet
        isOpened={isTimeVisible}
        onClose={() => {
          closeTimeBottomSheet();
        }}
        title="거래 날짜"
      >
        <TimePicker
          initValue={{
            ampm: data.walkDate.time.ampm,
            hour: data.walkDate.time.hour,
            minute: data.walkDate.time.minute,
          }}
          itemHeight={36}
          onTimeChange={(time) => {
            const { ampm, hour, minute } = time;

            updateData({
              walkDate: {
                ...data.walkDate,
                time: {
                  ampm,
                  hour,
                  minute,
                },
              },
            });
          }}
        />
        <View style={{ marginHorizontal: 16, marginTop: 24 }}>
          <Button label="선택" onPressHandler={closeTimeBottomSheet} />
        </View>
      </BottomSheet>
    </>
  );
};

export default AddPetMate;
