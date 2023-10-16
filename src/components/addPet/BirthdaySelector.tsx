import React from 'react';
import useModal from '../../hooks/useModal';
import Selectable from '../ui/Selectable';
import { View } from 'react-native';
import BottomSheet from '../ui/BottomSheet';
import Button from '../ui/buttons/Button';
import BirthdayPicker from '../ui/BirthdayPicker';
import { Date } from '../../types/interface';

interface Props {
  value: Partial<Date>;
  onChangeHandler: (value: Date) => void;
}

const BirthdaySelector = ({ value, onChangeHandler }: Props) => {
  const { isVisible, openModal, closeModal } = useModal();
  const isValidValue = Object.values(value).some((v) => !!v);

  const { yyyy, m, d } = (() => {
    if (!!isValidValue) {
      return {
        yyyy: value.yyyy,
        m: value.m,
        d: value.d,
      };
    } else {
      return {
        yyyy: '',
        m: '',
        d: '',
      };
    }
  })();

  return (
    <>
      <Selectable
        value={isValidValue ? `${value.yyyy} ${value.m} ${value.d}` : ''}
        onPressHandler={openModal}
      />
      <BottomSheet
        isOpened={isVisible}
        onClose={() => {
          closeModal();
        }}
        height={300}
        title="생년월일"
      >
        <BirthdayPicker
          itemHeight={36}
          onDateChange={(date) => {
            onChangeHandler(date);
          }}
          initValue={{
            yyyy: yyyy || '',
            m: m || '',
            d: d || '',
          }}
        />
        <View style={{ marginHorizontal: 16, marginTop: 24 }}>
          <Button label="선택" onPressHandler={closeModal} />
        </View>
      </BottomSheet>
    </>
  );
};

export default BirthdaySelector;
