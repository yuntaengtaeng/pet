import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import Dialog from '../components/ui/Dialog';
import { getRegisteredDogsList } from '../lib/api';
import { RootStackParamList } from '../types/navigation';
import useOverlay from './overlay/useOverlay';

interface Props {
  immediateStart?: boolean;
  onValidAction?: () => void;
}

const useDogCheckOrRegisterRedirect = ({
  immediateStart = false,
  onValidAction,
}: Props = {}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const overlay = useOverlay();

  const validate = async () => {
    const getDogList = await getRegisteredDogsList();

    if (getDogList.length > 0) {
      if (onValidAction) {
        onValidAction();
      }
    } else {
      overlay.open(
        <Dialog isOpened={true}>
          <Dialog.Title title="등록된 반려동물 정보가 없습니다." />
          <Dialog.Content content="함께할 반려동물 정보를 등록하고 산책 메이트를 모집해보세요." />
          <Dialog.Buttons
            buttons={[
              {
                label: '닫기',
                onPressHandler: () => {
                  overlay.close();
                  navigation.pop();
                },
              },
              {
                label: '정보 등록',
                onPressHandler: () => {
                  overlay.close();
                  navigation.push('AddPet', { type: 'dog' });
                },
              },
            ]}
          />
        </Dialog>
      );
    }
  };

  useEffect(() => {
    if (immediateStart) {
      validate();
    }
  }, [immediateStart]);

  return { validate };
};

export default useDogCheckOrRegisterRedirect;
