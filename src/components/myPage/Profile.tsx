import { View, Image, Text } from 'react-native';
import Color from '../../constants/color';
import TextIconButton from '../ui/buttons/TextIconButton';
import TYPOS from '../ui/typo';

const Profile = () => {
  return (
    <View
      style={{
        marginTop: 8,
        paddingBottom: 24,
        borderBottomColor: Color.neutral4,
        borderBottomWidth: 1,
        marginHorizontal: 16,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Image
        style={{ width: 56, height: 56, borderRadius: 56 }}
        source={require('../../../assets/img/placeholder.png')}
      />
      <View style={{ flex: 1 }}>
        <Text style={[TYPOS.headline2, { color: Color.black }]}>초코코</Text>
        <Text style={[TYPOS.body3, { color: Color.neutral3 }]}>
          역삼동 / 사당동
        </Text>
      </View>
      <TextIconButton label="수정" />
    </View>
  );
};

export default Profile;
