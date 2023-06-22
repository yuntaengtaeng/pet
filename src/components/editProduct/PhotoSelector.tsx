import React from 'react';
import { Pressable, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Camera from '../ui/icons/Camera';
import TYPOS from '../ui/typo';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import * as MediaLibrary from 'expo-media-library';
import Close from '../ui/icons/Close';

const LIMIT = 5;

interface Props {
  selectedPhotos: MediaLibrary.Asset[];
  updatePhotos: (photos: MediaLibrary.Asset[]) => void;
}

const PhotoSelector = ({ selectedPhotos, updatePhotos }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
            selectedPhotoIds: selectedPhotos,
            callback: (medias) => {
              updatePhotos(medias);
            },
          });
        }}
      >
        <Camera size={24} color={Color.black} />
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
              const clone = [...selectedPhotos];
              const findIndex = clone.findIndex(
                (clone) => clone.id === photo.id
              );

              if (findIndex !== -1) {
                clone.splice(findIndex, 1);
              }
              updatePhotos(clone);
            }}
            style={{
              width: 24,
              height: 24,
              backgroundColor: Color.neutral1,
              position: 'absolute',
              right: -6,
              top: -6,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Close size={20} color={Color.white} />
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
    marginRight: 4,
  },
});
