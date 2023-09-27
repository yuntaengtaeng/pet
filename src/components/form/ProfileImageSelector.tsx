import { View, Pressable, Image, Text, ViewStyle } from 'react-native';
import Color from '../../constants/color';
import Camera16 from '../ui/icons/Camera16';
import * as MediaLibrary from 'expo-media-library';
import useOverlay from '../../hooks/overlay/useOverlay';
import BottomSheet from '../ui/BottomSheet';
import TYPOS from '../ui/typo';
import Button from '../ui/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

interface Props<T> {
  photo: T;
  onPhotoChange: (photo: MediaLibrary.Asset | null) => void;
  containerStyle?: ViewStyle;
}

const ProfileImageSelector = <T extends MediaLibrary.Asset | string | null>({
  photo,
  onPhotoChange,
  containerStyle,
}: Props<T>) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const overlay = useOverlay();

  const openBottomSheet = () => {
    overlay.open(
      <BottomSheet
        isOpened={true}
        onClose={() => {
          overlay.close();
        }}
        height={310}
        title="프로필 이미지 변경"
      >
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View>
            <Pressable
              style={{ padding: 16 }}
              onPress={() => {
                overlay.close();
                navigation.navigate('Gallery', {
                  limit: 1,
                  callback: (medias) => {
                    const media = medias[0];
                    onPhotoChange(media);
                  },
                });
              }}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>
                앨범에서 선택
              </Text>
            </Pressable>
            <Pressable
              style={{ padding: 16 }}
              onPress={() => {
                overlay.close();
                onPhotoChange(null);
              }}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>
                기본이미지로 변경
              </Text>
            </Pressable>
          </View>
          <View style={{ marginHorizontal: 16, marginTop: 24 }}>
            <Button label="닫기" onPressHandler={overlay.close} />
          </View>
        </View>
      </BottomSheet>
    );
  };

  return (
    <View
      style={[
        {
          alignItems: 'center',
        },
        containerStyle,
      ]}
    >
      <Pressable
        style={{ position: 'relative' }}
        onPress={() => {
          openBottomSheet();
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 80 }}
          source={
            photo
              ? { uri: typeof photo === 'string' ? photo : photo.uri }
              : require('../../../assets/img/placeholder.png')
          }
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 24,
            height: 24,
            backgroundColor: Color.primary600,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Camera16 color={Color.white} />
        </View>
      </Pressable>
    </View>
  );
};

export default ProfileImageSelector;
