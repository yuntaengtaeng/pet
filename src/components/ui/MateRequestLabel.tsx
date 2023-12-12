import { useMemo } from 'react';
import { View, Image, Text, ViewStyle } from 'react-native';
import Color from '../../constants/color';
import { Pet } from '../../types/interface';
import Crown16 from './icons/Crown16';
import Dog16 from './icons/Dog16';
import TYPOS from './typo';

export interface Props {
  image?: string;
  name: string;
  isHost?: boolean;
  pets: Pet[];
  containerStyle?: ViewStyle;
}

const MateRequestLabel = ({
  image,
  name,
  isHost,
  pets,
  containerStyle,
}: Props) => {
  const [petNames, petImages] = useMemo(() => {
    const petNames = pets.map((pet) => pet.name).join(', ');
    const petImages = pets.map((pet) => pet.image);
    return [petNames, petImages];
  }, [pets]);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        containerStyle,
      ]}
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
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 8,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingRight: (petImages.length - 1) * 6,
          }}
        >
          {petImages.map((i, index) => {
            return (
              <Image
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  left: (petImages.length - (index + 1)) * 6,
                }}
                source={
                  !!i
                    ? { uri: i }
                    : require('../../../assets/img/pet-placeholder.png')
                }
              />
            );
          })}
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[TYPOS.body3, { color: Color.black }]}>{petNames}</Text>
        </View>
      </View>
    </View>
  );
};

export default MateRequestLabel;
