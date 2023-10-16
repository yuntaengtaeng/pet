import { View } from 'react-native';
import Color from '../../constants/color';
import WheelPicker from './WheelPicker';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Date } from '../../types/interface';

interface Props {
  onDateChange: (time: Date) => void;
  itemHeight: number;
  initValue?: Date;
}

const BirthdayPicker = ({ onDateChange, itemHeight, initValue }: Props) => {
  const { yyyy, m = '1월', d } = initValue || {};

  const years: string[] = [];
  const months: string[] = [];
  const [days, setDays] = useState<string[]>([]);

  const currentYear = dayjs().year();
  for (let year = 1990; year <= currentYear; year++) {
    years.push(`${year}년`);
  }

  for (let month = 1; month <= 12; month++) {
    months.push(`${month}월`);
  }

  const getLastDayOfMonth = (month: number) => {
    return dayjs()
      .month(month - 1)
      .endOf('month')
      .date();
  };

  useEffect(() => {
    const currentYear = dayjs().year();
    for (let year = 1990; year <= currentYear; year++) {
      years.push(`${year}년`);
    }

    for (let month = 1; month <= 12; month++) {
      months.push(`${month}월`);
    }

    const lastDayOfMonth = getLastDayOfMonth(parseInt(m));

    const newDays: string[] = [];

    for (let day = 1; day <= lastDayOfMonth; day++) {
      newDays.push(`${day}일`);
    }

    setDays(newDays);
  }, []);

  useEffect(() => {
    const lastDayOfMonth = getLastDayOfMonth(parseInt(m));

    const newDays = [];

    for (let day = 1; day <= lastDayOfMonth; day++) {
      newDays.push(`${day}일`);
    }

    setDays(newDays);

    if (parseInt(d || '1') > lastDayOfMonth) {
      handleIndexChange('d', `${lastDayOfMonth}일`);
    }
  }, [m]);

  const selectedYYYY = useRef('');
  const selectedM = useRef('');
  const selectedD = useRef('');

  const handleIndexChange = (category: string, item: string) => {
    switch (category) {
      case 'yyyy':
        selectedYYYY.current = item;
        break;
      case 'm':
        selectedM.current = item;
        break;
      case 'd':
        selectedD.current = item;
        break;
      default:
        throw new Error('Invalid time category');
    }

    onDateChange({
      yyyy: selectedYYYY.current,
      m: selectedM.current,
      d: selectedD.current,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: itemHeight * 3,
        justifyContent: 'center',
      }}
    >
      <WheelPicker
        items={years}
        onItemChange={(item) => handleIndexChange('yyyy', item)}
        itemHeight={itemHeight}
        initValue={yyyy}
        containerStyle={{ flex: 1, marginLeft: 56 }}
      />
      <WheelPicker
        items={months}
        onItemChange={(item) => handleIndexChange('m', item)}
        itemHeight={itemHeight}
        initValue={m}
        containerStyle={{ flex: 1 }}
      />
      {!!days.length && (
        <WheelPicker
          items={days}
          onItemChange={(item) => handleIndexChange('d', item)}
          itemHeight={itemHeight}
          initValue={d}
          containerStyle={{ flex: 1, marginRight: 56 }}
        />
      )}
      <View
        style={{
          position: 'absolute',
          height: itemHeight,
          top: itemHeight,
          backgroundColor: Color.neutral5,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      ></View>
    </View>
  );
};

export default BirthdayPicker;
