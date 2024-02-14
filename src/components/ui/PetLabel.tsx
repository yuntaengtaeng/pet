import { Pressable, Image, Text } from 'react-native';
import Color from '../../constants/color';
import { Pet } from '../../types/interface';
import TYPOS from './typo';
import UiCheckbox from './UiCheckbox';
import PetImage from './image/PetImage';

interface Props {
  pet: Pet;
  onPressHandler?: () => void;
  isChecked: boolean;
  disabled?: boolean;
}

const PetLabel = ({
  pet,
  onPressHandler,
  isChecked,
  disabled = false,
}: Props) => {
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
      <PetImage size={40} url={image} />
      <Text style={[TYPOS.body1, { color: Color.black, flex: 1 }]}>{name}</Text>
      <UiCheckbox size="small" isChecked={isChecked} disabled={disabled} />
    </Pressable>
  );
};

export default PetLabel;
