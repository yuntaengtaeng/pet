import React, { useContext, useEffect, useState } from 'react';
import Container from '../components/layout/Container';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Pressable, Text, View } from 'react-native';
import Header from '../components/ui/Header';
import UiSwitch from '../components/ui/UiSwitch';
import TYPOS from '../components/ui/typo';
import Color from '../constants/color';
import Button from '../components/ui/buttons/Button';
import RadioButtonGroup from '../components/ui/radio/RadioButtonGroup';
import Calendar from '../components/ui/Calender';
import TimePicker from '../components/ui/TimePicker';
import BottomSheet from '../components/ui/BottomSheet';
import RadioButtonItem from '../components/ui/radio/RadioButtonItem';
import useModal from '../hooks/useModal';
import TextIconButton from '../components/ui/buttons/TextIconButton';
import { useRecoilValue } from 'recoil';
import { WebSocketContext } from '../components/WebSocketContainer';
import { UserState } from '../store/atoms';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import axios from 'axios';
import useOverlay from '../hooks/overlay/useOverlay';
import Dialog from '../components/ui/Dialog';
dayjs.locale('ko');

export type AppointmentSchedulerScreenProps = StackScreenProps<
  RootStackParamList,
  'AppointmentScheduler'
>;

const AppointmentScheduler = ({
  navigation,
  route,
}: AppointmentSchedulerScreenProps) => {
  const overlay = useOverlay();
  const socket = useContext(WebSocketContext);
  const { accessToken } = useRecoilValue(UserState);
  const { roomId, type, scheduleId } = route.params;
  const [scheduleData, setScheduleData] = useState<{
    date: string;
    time: {
      ampm: string;
      hour: string;
      minute: string;
    };
    isAlarmOn: boolean;
    alarmTime: string;
  }>({
    date: '',
    time: {
      ampm: '',
      hour: '',
      minute: '',
    },
    isAlarmOn: false,
    alarmTime: '5분 전',
  });
  const {
    isVisible: isDateVisible,
    openModal: openDateBottomSheet,
    closeModal: closeDateBottomSheet,
  } = useModal();
  const {
    isVisible: isTimeVisible,
    openModal: openTimeBottomSheet,
    closeModal: closeTimeBottomSheet,
  } = useModal();

  const isButtonActive = !!scheduleData.date && !!scheduleData.time;

  const openSameScheduleDialog = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Title title="이 시간에 다른분과 직거래 약속이 있어요." />
        <Dialog.Content content="같은 시간에 약속을 잡을까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '취소',
              onPressHandler: overlay.close,
            },
            {
              label: '약속 잡기',
              onPressHandler: () => {
                overlay.close();
                onSubmit(
                  type === 'ADD' ? 'schedule' : 'patch-schedule',
                  'sameTime'
                );
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  useEffect(() => {
    if (!socket) return;

    const handleGetSameSchedule = () => {
      socket.on('same-schedule', (data) => {
        openSameScheduleDialog();
      });
    };

    const handleGetCreateSchedule = () => {
      socket.on('create-schedule', (data) => {
        navigation.pop();
      });
    };

    handleGetCreateSchedule();
    handleGetSameSchedule();

    return () => {
      socket.off('create-schedule');
      socket.off('same-schedule');
    };
  }, [socket, scheduleData]);

  useEffect(() => {
    if (!!scheduleId && type === 'MODIFY') {
      const fetch = async () => {
        try {
          const {
            data: { alarmInfo },
          } = await axios.get(`/chat/alarm?alarmId=${scheduleId}`);

          const date = dayjs(alarmInfo.promiseAt).format('YYYYMMDD');
          const isAlarmOn = alarmInfo.isAlarm;
          const [ampm, time] = alarmInfo.promiseTime.split(' ');
          const [hour, minute] = time.split(':');

          const timeObject = {
            ampm: ampm === '오후' ? 'PM' : 'AM',
            hour: hour.padStart(2, '0'),
            minute: minute.padStart(2, '0'),
          };

          setScheduleData({
            date,
            isAlarmOn,
            time: timeObject,
            alarmTime: alarmInfo.alarmTime || '5분 전',
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetch();
    }
  }, [scheduleId, type]);

  const onSubmit = (
    socketType: 'schedule' | 'patch-schedule',
    option?: 'sameTime'
  ) => {
    if (!socket || (socketType === 'patch-schedule' && !scheduleId)) {
      return;
    }

    const { ampm, hour, minute } = scheduleData.time;

    const combineTime = `${String(
      Number(hour) + (ampm === 'PM' ? 12 : 0)
    ).padStart(2, '0')}:${minute.padStart(2, '0')}`;

    const promiseAt = `${dayjs(scheduleData.date).format(
      'YYYY-MM-DD'
    )} ${combineTime}`;

    socket.emit(socketType, {
      token: accessToken,
      chatRoomId: roomId,
      promiseAt,
      ...(!!scheduleData.isAlarmOn && {
        alarmTime: scheduleData.alarmTime,
      }),
      ...(socketType === 'patch-schedule' &&
        scheduleId && {
          scheduleId,
        }),
      ...(option === 'sameTime' && {
        option,
      }),
    });
  };

  const onAdd = () => {
    onSubmit('schedule');
  };

  const onModify = () => {
    onSubmit('patch-schedule');
  };

  const onCancel = () => {
    if (!socket) {
      return;
    }

    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content="약속을 취소할까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '취소',
              onPressHandler: overlay.close,
            },
            {
              label: '확인',
              onPressHandler: () => {
                socket.emit('delete-schedule', {
                  token: accessToken,
                  scheduleId,
                });
                overlay.close();
                navigation.pop();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  return (
    <>
      <Header title="약속 잡기" />
      <Container>
        <View
          style={{
            height: 55,
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: Color.neutral5,
            borderBottomWidth: 1,
          }}
        >
          {scheduleData.date ? (
            <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
              {dayjs(scheduleData.date).format('M.D (dd)')}
            </Text>
          ) : (
            <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
              거래날짜
            </Text>
          )}
          <TextIconButton
            label={scheduleData.date ? '변경' : '선택'}
            onPressHandler={openDateBottomSheet}
          />
        </View>
        <View
          style={{
            height: 55,
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: Color.neutral5,
            borderBottomWidth: 1,
          }}
        >
          {scheduleData.time.ampm ? (
            <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
              {`${scheduleData.time.ampm === 'AM' ? '오전' : '오후'} ${
                scheduleData.time.hour
              }:${scheduleData.time.minute}`}
            </Text>
          ) : (
            <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>
              거래시간
            </Text>
          )}
          <TextIconButton
            label={scheduleData.time.ampm ? '변경' : '선택'}
            onPressHandler={openTimeBottomSheet}
          />
        </View>
        <View
          style={{
            height: 55,
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={[
              TYPOS.body1,
              {
                color: scheduleData.isAlarmOn ? Color.neutral1 : Color.neutral2,
              },
            ]}
          >
            약속 알림 시간 설정
          </Text>
          <UiSwitch
            isOn={scheduleData.isAlarmOn}
            onToggle={(isOn) => {
              setScheduleData({
                ...scheduleData,
                isAlarmOn: isOn,
              });
            }}
          />
        </View>
        {scheduleData.isAlarmOn && (
          <View style={{ paddingHorizontal: 24 }}>
            <RadioButtonGroup
              containerStyle={{ gap: 24 }}
              onSelected={(value) => {
                setScheduleData({
                  ...scheduleData,
                  alarmTime: value,
                });
              }}
              selected={scheduleData.alarmTime}
            >
              {['5분 전', '10분 전', '30분 전', '1시간 전'].map((time) => (
                <RadioButtonItem value={time} key={time}>
                  <Text style={[TYPOS.body1, { color: Color.black }]}>
                    {time}
                  </Text>
                </RadioButtonItem>
              ))}
            </RadioButtonGroup>
          </View>
        )}
      </Container>
      <View
        style={{
          marginHorizontal: 16,
          ...(type === 'MODIFY' && {
            flexDirection: 'row',
            gap: 16,
          }),
        }}
      >
        {type === 'ADD' ? (
          <Button
            label="완료"
            disabled={!isButtonActive}
            onPressHandler={onAdd}
          />
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <Button
                label="약속 취소"
                onPressHandler={onCancel}
                buttonType="secondary"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                label="완료"
                disabled={!isButtonActive}
                onPressHandler={onModify}
              />
            </View>
          </>
        )}
      </View>

      <BottomSheet
        isOpened={isDateVisible}
        onClose={() => {
          closeDateBottomSheet();
        }}
        title="거래 날짜"
      >
        <Calendar
          onSelectDateChangeHandler={(date) => {
            setScheduleData({
              ...scheduleData,
              date,
            });
          }}
          selectedDate={scheduleData.date}
        />
        <View style={{ marginHorizontal: 16, marginTop: 24 }}>
          <Button label="선택" onPressHandler={closeDateBottomSheet} />
        </View>
      </BottomSheet>

      <BottomSheet
        isOpened={isTimeVisible}
        onClose={() => {
          closeTimeBottomSheet();
        }}
        title="거래 날짜"
      >
        <TimePicker
          initValue={{
            ampm: scheduleData.time.ampm,
            hour: scheduleData.time.hour,
            minute: scheduleData.time.minute,
          }}
          itemHeight={36}
          onTimeChange={(time) => {
            const { ampm, hour, minute } = time;

            setScheduleData({
              ...scheduleData,
              time: {
                ampm,
                hour,
                minute,
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

export default AppointmentScheduler;
