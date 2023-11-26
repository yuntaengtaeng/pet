import { View, Image, Text } from 'react-native';
import Color from '../../constants/color';
import Crown16 from './icons/Crown16';
import Dog16 from './icons/Dog16';
import TYPOS from './typo';

interface Props {
  image?: string;
  name: string;
  isHost?: boolean;
  petCount: number;
}

const MateRequestLabel = ({ image, name, isHost, petCount }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 40 }}
        source={
          image
            ? { uri: image }
            : require('../../../assets/img/placeholder.png')
        }
      />

      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <Text
          style={[
            TYPOS.headline4,
            {
              color: Color.black,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            },
          ]}
        >
          {name}
        </Text>
        {isHost && <Crown16 />}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Dog16 color={Color.neutral1} />
        <Text style={[TYPOS.body1, { color: Color.neutral1, marginLeft: 2 }]}>
          {petCount}
        </Text>
      </View>
    </View>
  );
};

export default MateRequestLabel;
