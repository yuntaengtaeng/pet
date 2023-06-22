import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Header from '../components/ui/Header';
import Container from '../components/layout/Container';
import Button from '../components/ui/buttons/Button';
import { RootStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import ArrowSwap from '../components/ui/icons/ArrowSwap';
import Color from '../constants/color';

export type CameraScreenProps = StackScreenProps<RootStackParamList, 'Camera'>;

const CameraScreen = ({ navigation, route }: CameraScreenProps) => {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.front);
  const { callback } = route.params;

  const changeType = () => {
    if (type === CameraType.front) {
      setType(CameraType.back);
    } else {
      setType(CameraType.front);
    }
  };

  const takePicture = async () => {
    if (hasPermission) {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        savePicture(photo);
      }
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  };

  const savePicture = async (photo: CameraCapturedPicture) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      MediaLibrary.createAlbumAsync('Camera', asset, false)
        .then(() => {
          console.log('Photo saved to camera roll');
        })
        .catch((error) => {
          console.log(
            'An error occurred while saving the photo to camera roll:',
            error
          );
        });
    }
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermission();
  }, []);

  useEffect(() => {
    return () => {
      callback();
    };
  }, []);

  return (
    <>
      <Header title="사진 촬영" />
      <Container>
        {hasPermission && (
          <>
            <Camera
              style={{ flex: 1, position: 'relative' }}
              ref={cameraRef}
              type={type}
            >
              <View
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                }}
              >
                <Pressable style={{}} onPress={changeType}>
                  <ArrowSwap size={36} color={Color.white} />
                </Pressable>
              </View>
            </Camera>
            <Button label="촬영" onPressHandler={takePicture} />
          </>
        )}
      </Container>
    </>
  );
};
export default CameraScreen;
