import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

interface Props {
  label: string;
  theme: 'warning' | 'success';
}

const Tag = ({ label, theme }: Props) => {
  const [color, bgColor] = (() => {
    switch (theme) {
      case 'success':
        return [Color.success, Color.successBg];
      case 'warning':
        return [Color.warning, Color.warningBg];
    }
  })();

  return (
    <View
      style={{
        backgroundColor: bgColor,
        alignSelf: 'flex-start',
        borderRadius: 6,
      }}
    >
      <Text
        style={[
          TYPOS.body3,
          {
            color: color,
            padding: 4,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default Tag;
