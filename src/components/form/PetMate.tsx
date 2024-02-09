import dayjs from 'dayjs';
import { useRef, useReducer } from 'react';
import { View } from 'react-native';
import Button from '../ui/buttons/Button';
import Line from './PetMate/Line';
import Color from '../../constants/color';
import useDogCheckOrRegisterRedirect from '../../hooks/useDogCheckOrRegisterRedirect';
import useModal from '../../hooks/useModal';
import ScrollContainer from '../layout/ScrollContainer';
import Accordion from '../ui/Accordion';
import BottomSheet from '../ui/BottomSheet';
import Calendar from '../ui/Calender';
import PetSelectBottomSheet from '../ui/PetSelectBottomSheet';
import Selectable from '../ui/Selectable';
import TimePicker from '../ui/TimePicker';
import Calendar24 from '../ui/icons/Calendar24';
import Location24 from '../ui/icons/Location24';
import Time24 from '../ui/icons/Time24';
import InputField from '../ui/inputs/InputField';
import TextArea from '../ui/inputs/TextArea';
import { Pet } from '../../types/interface';
import Count from './PetMate/Count';
import NonCollapsibleAccordion from './PetMate/NonCollapsibleAccordion';
import Header from '../ui/Header';

export interface WalkDate {
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

export interface SubmitData extends Omit<Data, 'pets' | 'walkDate'> {
  petIds: string[];
  walkDate: Date;
}

interface Props {
  onSubmitHandler: (data: SubmitData) => void;
  initData?: Data;
}

const PetMate = ({ onSubmitHandler, initData }: Props) => {
  const { isVisible, openModal, closeModal } = useModal();
  const {
    isVisible: isTimeVisible,
    openModal: openTimeBottomSheet,
    closeModal: closeTimeBottomSheet,
  } = useModal();
  const shouldSetInitialCalenderValue = useRef(true);
  useDogCheckOrRegisterRedirect({ immediateStart: true });

  const [data, updateData] = useReducer(
    (prev: Data, next: Partial<Data>) => {
      return { ...prev, ...next };
    },
    {
      pets: initData?.pets || [],
      title: initData?.title || '',
      content: initData?.content || '',
      walkDate: {
        date: initData?.walkDate.date || '',
        time: {
          ampm: initData?.walkDate.time.ampm || '',
          hour: initData?.walkDate.time.hour || '',
          minute: initData?.walkDate.time.minute || '',
        },
      },
      place: initData?.place || '',
      maxPet: initData?.maxPet || 0,
    }
  );

  const selectedPetName = data.pets.map((pet) => pet.name).join(', ');

  const isButtonActive = (() => {
    const clone = { ...data };

    return [
      !!clone.pets.length,
      !!clone.title,
      !!clone.content,
      !!clone.walkDate.date,
      !!clone.walkDate.time.ampm,
      !!clone.place,
      !!clone.maxPet,
    ].every((boolean) => !!boolean);
  })();

  const createDate = (): Date => {
    const { date, time } = { ...data.walkDate };
    const { ampm, hour, minute } = time;

    const formattedDate = dayjs(
      `${date} ${
        ampm === 'PM' ? (Number(hour) + 12).toString().padStart(2, '0') : hour
      }:${Number(minute)}`,
      'YYYYMMDD hh:mm'
    );

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

    onSubmitHandler(body);
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
          <View style={{ paddingVertical: 16 }}>
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
          </View>
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
        <Button
          label="등록"
          onPressHandler={onSubmit}
          disabled={!isButtonActive}
        />
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

export default PetMate;
