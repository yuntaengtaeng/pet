import axios from 'axios';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getRegisteredDogsList } from '../../lib/api';
import { Pet } from '../../types/interface';
import BottomSheet from './BottomSheet';
import Button from './buttons/Button';
import PetLabel from './PetLabel';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedPets?: Pet[];
  successButtonHandler: (pets: Pet[]) => void;
}

const PetSelectBottomSheet = ({
  isVisible,
  onClose,
  selectedPets = [],
  successButtonHandler,
}: Props) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [localSelectedPets, setLocalSelectedPets] = useState<Pet[]>([
    ...selectedPets,
  ]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getRegisteredDogsList();
      setPets(result);
    };

    fetch();
  }, []);

  const selectedIds = [...localSelectedPets].map((pet) => pet.id);

  return (
    <BottomSheet isOpened={isVisible} title="함께할 반려동물" onClose={onClose}>
      <View>
        <View>
          {pets.map((pet) => {
            const isChecked = selectedIds.includes(pet.id);

            return (
              <PetLabel
                key={pet.id}
                pet={pet}
                isChecked={isChecked}
                onPressHandler={() => {
                  if (isChecked) {
                    const filteredPets = [...localSelectedPets].filter(
                      (p) => pet.id !== p.id
                    );
                    setLocalSelectedPets(filteredPets);
                  } else {
                    setLocalSelectedPets([...localSelectedPets, pet]);
                  }
                }}
              />
            );
          })}
        </View>
        <View
          style={{
            paddingTop: 24,
            paddingBottom: 32,
            paddingHorizontal: 16,
          }}
        >
          <Button
            label="완료"
            onPressHandler={() => {
              onClose();
              successButtonHandler(localSelectedPets);
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default PetSelectBottomSheet;
