import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';

interface Props {
  title?: string;
  description: string;
}

const EmptyList = ({ title, description }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {title && (
        <Text
          style={[TYPOS.headline2, { color: Color.neutral1, marginBottom: 8 }]}
        >
          {title}
        </Text>
      )}
      <Text style={[TYPOS.body1, { color: Color.neutral1 }]}>
        {description}
      </Text>
    </View>
  );
};

export default EmptyList;
