import { View, Image, Text } from 'react-native';
import TYPOS from './typo';
import Color from '../../constants/color';
import TextButton from './buttons/TextButton';

interface Props {
  isBlocked: boolean;
  nickname: string;
  profileImage?: string;
  onToggleHandler: () => void;
}

const UserBlockListItem = ({
  isBlocked,
  nickname,
  profileImage,
  onToggleHandler,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 16,
      }}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 40 }}
        source={
          !!profileImage
            ? { uri: profileImage }
            : require('../../../assets/img/placeholder.png')
        }
      />
      <Text style={[TYPOS.headline4, { color: Color.black, flex: 1 }]}>
        {nickname}
      </Text>
      <TextButton
        onPressHandler={onToggleHandler}
        buttonType={isBlocked ? 'primary' : 'secondary'}
        label={isBlocked ? '차단해제' : '차단하기'}
      />
    </View>
  );
};

export default UserBlockListItem;
