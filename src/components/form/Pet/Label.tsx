import { Text } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';

interface Props {
  label: string;
  required?: boolean;
}

const Label = ({ label, required }: Props) => {
  return (
    <Text style={[TYPOS.body2, { color: Color.neutral1, marginBottom: 8 }]}>
      {label}
      {required && <Text style={[TYPOS.body2, { color: Color.error }]}>*</Text>}
    </Text>
  );
};

export default Label;
