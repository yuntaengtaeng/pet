import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  Text,
  Linking,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import useDidUpdate from '../hooks/useDidUpdate';

import Header from '../components/ui/Header';
import Color from '../constants/color';
import TYPOS from '../components/ui/typo';
import Camera from '../components/ui/icons/Camera';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import Check from '../components/ui/icons/Check';
import useModal from '../hooks/useModal';
import Dialog from '../components/ui/Dialog';

export type GalleryScreenProps = StackScreenProps<
  RootStackParamList,
  'Gallery'
>;

const Gallery = ({ navigation, route }: GalleryScreenProps) => {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useRecoilState(LoadingState);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const { limit, callback, selectedPhotoIds = [] } = route.params;

  const { isVisible, openModal, closeModal } = useModal();

  const [selectedPhtos, setSelectedPhtos] = useState<MediaLibrary.Asset[]>([
    ...selectedPhotoIds,
  ]);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Media library permission denied');
      Linking.openSettings();
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
    setIsLoading(true);

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

  const decideSelectedIndicator = (index: number) => {
    if (limit === 1) {
      return <Check size={16} color={Color.white} />;
    } else {
      return (
        <Text
          style={[
            TYPOS.body3,
            {
              lineHeight: undefined,
              color: Color.white,
            },
          ]}
        >
          {index + 1}
        </Text>
      );
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
        style={{
          width: itemWidth,
          height: itemWidth,
          aspectRatio: 1,
          position: 'relative',
          borderWidth: 2,
          borderColor: isSelected ? Color.primary700 : Color.white,
        }}
        onPress={() => {
          if (limit === 1) {
            setSelectedPhtos([item]);
            return;
          }

          if (isSelected) {
            const clone = [...selectedPhtos];
            clone.splice(selectedIndex, 1);
            setSelectedPhtos(clone);
          } else {
            if (selectedPhtos.length < limit) {
              const clone = [...selectedPhtos];
              clone.push(item);
              setSelectedPhtos(clone);
            } else {
              openModal();
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
          {isSelected && decideSelectedIndicator(selectedIndex)}
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
      <Dialog isOpened={isVisible}>
        <Dialog.Content
          content={`사진은 최대 ${limit}장만 선택할 수 있습니다.`}
        />
        <Dialog.Buttons
          buttons={[
            {
              label: '확인',
              onPressHandler: () => {
                closeModal();
              },
            },
          ]}
        />
      </Dialog>
    </>
  );
};

export default Gallery;
