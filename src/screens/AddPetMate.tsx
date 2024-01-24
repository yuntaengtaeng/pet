import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import PetMate, { SubmitData } from '../components/form/PetMate';

export type AddPetMateScreenProps = StackScreenProps<
  RootStackParamList,
  'AddPetMate'
>;

const AddPetMate = ({ navigation, route }: AddPetMateScreenProps) => {
  const setIsLoading = useSetRecoilState(LoadingState);

  const onSubmit = async (data: SubmitData) => {
    setIsLoading(true);
    try {
      await axios.post('/board/pet-mate', {
        ...data,
      });
      navigation.pop();
    } finally {
      setIsLoading(false);
    }
  };

  return <PetMate onSubmitHandler={onSubmit} />;
};

export default AddPetMate;
