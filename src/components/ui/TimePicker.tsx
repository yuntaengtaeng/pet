import { View } from 'react-native';
import Color from '../../constants/color';
import WheelPicker from './WheelPicker';
import { useRef } from 'react';

interface Time {
  ampm: string;
  hour: string;
  minute: string;
}

interface Props {
  onTimeChange: (time: Time) => void;
  itemHeight: number;
}

const TimePicker = ({ onTimeChange, itemHeight }: Props) => {
  const ampmItems = ['AM', 'PM'];
  const hourItems = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minuteItems = Array.from({ length: 60 }, (_, i) => i.toString());

  const selectedAMPM = useRef('');
  const selectedHour = useRef('');
  const selectedMinute = useRef('');

  const handleIndexChange = (category: string, item: string) => {
    switch (category) {
      case 'ampm':
        selectedAMPM.current = item;
        break;
      case 'hour':
        selectedHour.current = item;
        break;
      case 'minute':
        selectedMinute.current = item;
        break;
      default:
        throw new Error('Invalid time category');
    }

    onTimeChange({
      ampm: selectedAMPM.current,
      hour: selectedHour.current,
      minute: selectedMinute.current,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: itemHeight * 3,
      }}
    >
      <WheelPicker
        items={ampmItems}
        onItemChange={(item) => handleIndexChange('ampm', item)}
        itemHeight={itemHeight}
      />
      <WheelPicker
        items={hourItems}
        onItemChange={(item) => handleIndexChange('hour', item)}
        itemHeight={itemHeight}
      />
      <WheelPicker
        items={minuteItems}
        onItemChange={(item) => handleIndexChange('minute', item)}
        itemHeight={itemHeight}
      />
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

export default TimePicker;
