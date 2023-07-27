import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Header from '../components/ui/Header';
import Container from '../components/layout/Container';
import { RootStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import ArrowSwap from '../components/ui/icons/ArrowSwap';
import Color from '../constants/color';
import TYPOS from '../components/ui/typo';
import Swap from '../components/ui/icons/Swap';

export type CameraScreenProps = StackScreenProps<RootStackParamList, 'Camera'>;

const CameraScreen = ({ navigation, route }: CameraScreenProps) => {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
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
        setPhoto(photo);
      }
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  };

  const savePicture = async () => {
    if (photo) {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        retakePicture();
        try {
          await MediaLibrary.createAlbumAsync('Camera', asset, false);
        } catch (error) {
          console.error(
            'An error occurred while saving the photo to camera roll:',
            error
          );
        }
      }
    }
  };

  const retakePicture = () => {
    setPhoto(null);
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
            {!photo ? (
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
                  ></View>
                </Camera>
                <View
                  style={{
                    height: 160,
                    backgroundColor: Color.black,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 24,
                  }}
                >
                  <Pressable
                    style={{ marginRight: 'auto' }}
                    onPress={() => {
                      navigation.pop();
                    }}
                  >
                    <Text
                      style={[
                        TYPOS.medium,
                        {
                          color: Color.neutral2,
                          paddingHorizontal: 14,
                          paddingVertical: 8,
                        },
                      ]}
                    >
                      취소
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                      backgroundColor: Color.primary700,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={takePicture}
                  >
                    <View
                      style={{
                        borderColor: Color.black,
                        borderWidth: 8,
                        width: 62,
                        height: 62,
                        borderRadius: 62,
                      }}
                    ></View>
                  </Pressable>
                  <Pressable
                    onPress={changeType}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 54,
                      backgroundColor: Color.neutral1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 'auto',
                    }}
                  >
                    <Swap size={24} color={Color.white} />
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{ uri: photo.uri }}
                    style={{ flex: 1, width: '100%' }}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      marginTop: 16,
                      paddingHorizontal: 16,
                    }}
                  >
                    <Pressable onPress={retakePicture}>
                      <Text style={TYPOS.headline3}>다시 찍기</Text>
                    </Pressable>
                    <Pressable onPress={savePicture}>
                      <Text style={TYPOS.headline3}>저장</Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};
export default CameraScreen;
