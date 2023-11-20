import { Pressable, Image, Text } from 'react-native';
import Color from '../../constants/color';
import { Pet } from '../../types/interface';
import TYPOS from './typo';
import UiCheckbox from './UiCheckbox';

interface Props {
  pet: Pet;
  onPressHandler?: () => void;
  isChecked: boolean;
}

const PetLabel = ({ pet, onPressHandler, isChecked }: Props) => {
  const { id, image, name, type } = pet;
  return (
    <Pressable
      style={{
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 24,
      }}
      onPress={onPressHandler}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 40 }}
        source={
          !!image
            ? { uri: image }
            : require('../../../assets/img/pet-placeholder.png')
        }
      />
      <Text style={[TYPOS.body1, { color: Color.black, flex: 1 }]}>{name}</Text>
      <UiCheckbox size="small" isChecked={isChecked} />
    </Pressable>
  );
};

export default PetLabel;
