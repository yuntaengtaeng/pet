import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

export type PetMateDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'PetMateDetail'
>;

const PetMateDetail = ({ navigation, route }: PetMateDetailScreenProps) => {
  return <></>;
};

export default PetMateDetail;
