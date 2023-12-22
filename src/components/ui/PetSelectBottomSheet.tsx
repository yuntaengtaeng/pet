import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { getRegisteredDogsList } from '../../lib/api';
import { Pet } from '../../types/interface';
import BottomSheet, { BottomSheetRef } from './BottomSheet';
import Button from './buttons/Button';
import PetLabel from './PetLabel';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedPets?: Pet[];
  successButtonHandler: (pets: Pet[]) => void;
  limit?: number;
}

const PetSelectBottomSheet = ({
  isVisible,
  onClose,
  selectedPets = [],
  successButtonHandler,
  limit,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
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

  useEffect(() => {
    if (isVisible) {
      setLocalSelectedPets(selectedPets);
    }
  }, [isVisible]);

  return (
    <BottomSheet
      isOpened={isVisible}
      title="함께할 반려동물"
      onClose={onClose}
      ref={bottomSheetRef}
    >
      <View>
        <View>
          {pets.map((pet) => {
            const isChecked = selectedIds.includes(pet.id);
            let disabled =
              !!limit && limit === selectedIds.length && !isChecked;

            return (
              <PetLabel
                key={pet.id}
                pet={pet}
                isChecked={isChecked}
                disabled={disabled}
                onPressHandler={() => {
                  if (disabled) {
                    bottomSheetRef.current?.showToastMessage(
                      '선택 가능 견수를 초과했습니다.'
                    );
                    return;
                  }

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
