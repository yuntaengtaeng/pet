import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import Color from '../../constants/color';
import { RootStackParamList } from '../../types/navigation';
import TextIconButton from '../ui/buttons/TextIconButton';
import TYPOS from '../ui/typo';

interface UserInfo {
  nickname: string;
  address: string;
  profileImage?: string;
}

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get<{ userInfo: UserInfo }>(
        '/my-page/user-info'
      );

      setUserInfo(data.userInfo);
    };

    fetch();
  }, []);

  if (!userInfo) {
    return null;
  }

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
        source={
          userInfo.profileImage
            ? { uri: userInfo.profileImage }
            : require('../../../assets/img/placeholder.png')
        }
      />
      <View style={{ flex: 1 }}>
        <Text style={[TYPOS.headline2, { color: Color.black }]}>
          {userInfo.nickname}
        </Text>
        <Text style={[TYPOS.body3, { color: Color.neutral3 }]}>
          {userInfo.address}
        </Text>
      </View>
      <TextIconButton
        label="수정"
        onPressHandler={() => {
          navigation.navigate('ModifyProfile');
        }}
      />
    </View>
  );
};

export default Profile;
