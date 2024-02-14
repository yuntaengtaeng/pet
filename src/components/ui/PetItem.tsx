import { Pressable, View, Image, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';
import { Pet } from '../../types/interface';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import PetImage from './image/PetImage';

interface Props extends Pet {}

const PetItem = ({ id, image, name, type }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      key={id}
      style={{
        width: 156,
        height: 88,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Color.primary700,
        borderRadius: 5,
      }}
      onPress={() => {
        navigation.push('PetDetail', { petId: id });
      }}
    >
      <PetImage size={56} url={image} />
      <View>
        <Text style={[TYPOS.headline4, { color: Color.black }]}>{name}</Text>
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>{type}</Text>
      </View>
    </Pressable>
  );
};

export default PetItem;
