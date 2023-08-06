import React from 'react';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, Pressable, Text, StyleSheet, Image } from 'react-native';
import Color from '../../../constants/color';
import { RootStackParamList } from '../../../types/navigation';
import Close20 from '../../ui/icons/Close20';
import TYPOS from '../../ui/typo';
import Camera24 from '../../ui/icons/Camera24';

const LIMIT = 5;

interface SaveImageType {
  uri: string;
  id: string;
}

export type ImageType = SaveImageType | MediaLibrary.Asset;
interface Props {
  selectedPhotos: ImageType[];
  updatePhotos: (photos: ImageType[]) => void;
  deletePhoto: (id: string) => void;
}

const checkMediaAssetType = (data: MediaLibrary.Asset | ImageType) => {
  return 'filename' in data;
};

const PhotoSelector = ({
  selectedPhotos,
  updatePhotos,
  deletePhoto,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const selectedAssetPhotos = selectedPhotos.filter((value) =>
    checkMediaAssetType(value)
  ) as MediaLibrary.Asset[];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      contentContainerStyle={{ paddingTop: 24 }}
      style={{
        height: 100,
      }}
    >
      <Pressable
        style={[
          {
            borderWidth: 1,
            borderColor: Color.neutral3,
            alignItems: 'center',
            justifyContent: 'center',
          },
          styles.box,
        ]}
        onPress={() => {
          navigation.push('Gallery', {
            limit: LIMIT,
            selectedPhotoIds: selectedAssetPhotos,
            callback: (medias) => {
              const selectedIds = selectedPhotos.map((photo) => photo.id);

              const excludeDuplicatesMedias = medias.filter(
                (media) => !selectedIds.includes(media.id)
              );
              updatePhotos(excludeDuplicatesMedias);
            },
          });
        }}
      >
        <Camera24 color={Color.black} />
        <Text
          style={[TYPOS.body3, { color: Color.black }]}
        >{`${selectedPhotos.length}/${LIMIT}`}</Text>
      </Pressable>
      {selectedPhotos.map((photo) => (
        <Pressable
          key={photo.id}
          style={[styles.box, { position: 'relative' }]}
        >
          <Image
            source={{ uri: photo.uri }}
            style={{ flex: 1, resizeMode: 'cover' }}
          />

          <Pressable
            onPress={() => {
              deletePhoto(photo.id);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: Color.neutral1,
              position: 'absolute',
              right: -6,
              top: -6,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Close20 color={Color.white} />
          </Pressable>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default PhotoSelector;

const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
    width: 76,
    height: 76,
    marginRight: 8,
  },
});
