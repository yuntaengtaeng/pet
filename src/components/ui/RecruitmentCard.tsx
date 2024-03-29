import { Pressable, View, Text } from 'react-native';
import Color from '../../constants/color';
import Tag from './Tag';
import TYPOS from './typo';
import Dog16 from './icons/Dog16';
import { PetMateStatus } from '../../types/interface';

interface Limit {
  current: number;
  max: number;
}

interface Props {
  status: PetMateStatus;
  title: string;
  description: string;
  limit: Limit;
  onPressHandler: () => void;
}

const RecruitmentCard = ({
  status,
  title,
  description,
  limit,
  onPressHandler,
}: Props) => {
  return (
    <Pressable
      style={{ gap: 4, backgroundColor: Color.white }}
      onPress={onPressHandler}
    >
      <View>
        <Tag
          label={status}
          theme={status === '모집마감' ? 'warning' : 'success'}
        />
      </View>
      <View>
        <Text style={[TYPOS.headline4, { color: Color.black }]}>{title}</Text>
      </View>
      <View>
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
          {description}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Dog16 color={Color.neutral2} />
        <Text style={[TYPOS.body3, { color: Color.neutral2 }]}>
          {limit.current}/{limit.max}마리
        </Text>
      </View>
    </Pressable>
  );
};

export default RecruitmentCard;
