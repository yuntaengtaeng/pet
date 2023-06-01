import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import useDidUpdate from '../hooks/useDidUpdate';

import Header from '../components/ui/Header';
import Color from '../constants/color';
import TYPOS from '../components/ui/typo';
import Camera from '../components/ui/icons/Camera';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

export type GalleryScreenProps = StackScreenProps<
  RootStackParamList,
  'Gallery'
>;

const Gallery = ({ navigation, route }: GalleryScreenProps) => {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);

  const [selectedPhtos, setSelectedPhtos] = useState<MediaLibrary.Asset[]>([]);

  const { limit, callback } = route.params;

  const requestMediaLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Media library permission denied');
      return;
    }

    fetchPhotos();
  };

  useEffect(() => {
    requestMediaLibraryPermissions();
  }, []);

  useDidUpdate(() => {
    if (!photos.length) {
      fetchPhotos();
    }
  }, [photos]);

  const initPhotos = () => {
    setPhotos([]);
  };

  const fetchPhotos = async (cursor?: string | undefined) => {
    try {
      const {
        assets,
        endCursor: newEndCursor,
        hasNextPage,
      } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 20,
        after: cursor,
      });

      setPhotos((prevPhotos) => [...prevPhotos, ...assets]);
      setEndCursor(newEndCursor);
      setHasNextPage(hasNextPage);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching photos:', error);
    }
  };

  const renderPhotoItem: React.FC<{ item: MediaLibrary.Asset }> = ({
    item,
  }) => {
    const windowWidth = Dimensions.get('window').width;
    const numColumns = 3;
    const itemWidth = windowWidth / numColumns;
    const selectedIndex = [...selectedPhtos].findIndex(
      ({ id }) => item.id === id
    );
    const isSelected = selectedIndex !== -1;

    return (
      <Pressable
        style={{ width: itemWidth, aspectRatio: 1, position: 'relative' }}
        onPress={() => {
          if (isSelected) {
            const clone = [...selectedPhtos];
            clone.splice(selectedIndex, 1);
            setSelectedPhtos(clone);
          } else {
            if (selectedPhtos.length < limit) {
              const clone = [...selectedPhtos];
              clone.push(item);
              setSelectedPhtos(clone);
            }
          }
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            zIndex: 1,
            elevation: 1,
            borderRadius: 16,
            backgroundColor: isSelected ? Color.primary700 : Color.white,
            borderColor: isSelected ? Color.primary700 : Color.neutral3,
            borderWidth: 1,
            right: 12,
            top: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isSelected && (
            <Text style={[TYPOS.body3, { color: Color.white }]}>
              {selectedIndex + 1}
            </Text>
          )}
        </View>
        <Image
          source={{ uri: item.uri }}
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      </Pressable>
    );
  };

  const renderCameraButton = () => (
    <Pressable
      onPress={handleTakePhoto}
      style={{
        width: itemWidth,
        aspectRatio: 1,
        backgroundColor: Color.white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Camera size={32} />
      <Text style={[TYPOS.body3, { color: Color.black }]}>사진 촬영</Text>
    </Pressable>
  );

  const onCompleteHandler = () => {
    callback([...selectedPhtos]);
    navigation.goBack();
  };

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchPhotos(endCursor);
    }
  };

  const handleTakePhoto = () => {
    navigation.navigate('Camera', { callback: initPhotos });
  };

  const windowWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const itemWidth = windowWidth / numColumns;

  return (
    <>
      <Header
        title="최근 항목"
        rightContent={
          <Pressable onPress={onCompleteHandler}>
            <Text
              style={[
                TYPOS.small,
                {
                  color:
                    selectedPhtos.length > 0
                      ? Color.primary900
                      : Color.neutral2,
                },
              ]}
            >
              완료
            </Text>
          </Pressable>
        }
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={[null, ...photos]}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          renderItem={({ item, index }) =>
            item
              ? renderPhotoItem({ item })
              : index === 0
              ? renderCameraButton()
              : null
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
    </>
  );
};

export default Gallery;
