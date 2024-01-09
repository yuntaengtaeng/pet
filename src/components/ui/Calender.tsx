import { View, Text, Pressable } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';
import Left24 from './icons/Left24';
import Right24 from './icons/Right24';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Props {
  //YYYYMMDD
  selectedDate?: string;
  //date : YYYYMMDD
  onSelectDateChangeHandler?: (date: string) => void;
  endDateData: {
    value: number;
    unit: dayjs.ManipulateType;
  };
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({
  selectedDate,
  onSelectDateChangeHandler,
  endDateData,
}: Props) => {
  const getWeeksOfMonth = (month: number): Dayjs[][] => {
    const weeks: Dayjs[][] = [];
    const firstDayOfMonth = dayjs()
      .month(month - 1)
      .startOf('month');
    const lastDayOfMonth = dayjs()
      .month(month - 1)
      .endOf('month');

    let currentDate = firstDayOfMonth;
    let currentWeek: Dayjs[] = [];

    for (let i = 0; i < firstDayOfMonth.day(); i++) {
      currentWeek.push(dayjs(null));
    }

    while (currentDate <= lastDayOfMonth) {
      currentWeek.push(currentDate);

      if (currentDate.day() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate = currentDate.add(1, 'day');
    }

    for (let i = currentWeek.length; i < 7; i++) {
      currentWeek.push(dayjs(null));
    }

    weeks.push(currentWeek);

    return weeks;
  };

  const now = dayjs();
  const endDate = dayjs().add(endDateData.value, endDateData.unit);

  //Dayjs get month start = 0;
  const [selectedMonth, setSelectedMonth] = useState(now.get('month') + 1);
  const weeks: Dayjs[][] = useMemo(
    () => getWeeksOfMonth(selectedMonth),
    [selectedMonth]
  );

  const onMonthChangeHandler = (type: 'ADD' | 'SUBTRACT') => {
    if (type === 'ADD') {
      setSelectedMonth((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const isPrevButtonDisabled = useMemo(() => {
    return now.isSameOrAfter(
      dayjs()
        .month(selectedMonth - 2)
        .endOf('month')
    );
  }, [now, selectedMonth]);

  const isNextButtonDisabled = useMemo(() => {
    return endDate.isSameOrBefore(
      dayjs().month(selectedMonth).startOf('month')
    );
  }, [endDate, selectedMonth]);

  const getDayTextColor = (isSelectedDate: boolean, isInDateRange: boolean) => {
    if (isSelectedDate) {
      return Color.white;
    }
    if (isInDateRange) {
      return Color.neutral1;
    }
    return Color.neutral3;
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
        }}
      >
        <Pressable
          disabled={isPrevButtonDisabled}
          onPress={() => {
            onMonthChangeHandler('SUBTRACT');
          }}
        >
          <Left24
            color={isPrevButtonDisabled ? Color.neutral3 : Color.neutral1}
          />
        </Pressable>
        <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
          {selectedMonth}월
        </Text>
        <Pressable
          disabled={isNextButtonDisabled}
          onPress={() => {
            onMonthChangeHandler('ADD');
          }}
        >
          <Right24
            color={isNextButtonDisabled ? Color.neutral3 : Color.neutral1}
          />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {WEEK_DAYS.map((day) => (
          <Text
            key={day}
            style={[
              TYPOS.headline4,
              { color: Color.neutral1, flex: 1, textAlign: 'center' },
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
      <View style={{ height: 32 * 5 }}>
        {weeks.map((week, index) => (
          <View key={index} style={{ flexDirection: 'row', minHeight: 32 }}>
            {week.map((day, dayIndex) => {
              const isInDateRange =
                day &&
                day.isSameOrAfter(now, 'day') &&
                day.isSameOrBefore(endDate, 'day');

              const isSelectedDate = day.format('YYYYMMDD') === selectedDate;

              return (
                <Pressable
                  onPress={() => {
                    if (!isInDateRange) {
                      return;
                    }

                    if (onSelectDateChangeHandler) {
                      onSelectDateChangeHandler(day.format('YYYYMMDD'));
                    }
                  }}
                  key={dayIndex}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 32,
                    ...(!!isSelectedDate && {
                      backgroundColor: Color.primary700,
                      borderRadius: 8,
                    }),
                  }}
                >
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        color: getDayTextColor(isSelectedDate, isInDateRange),
                      },
                    ]}
                  >
                    {day.date() || ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
