import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, AppState } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Header from '../components/ui/Header';
import Container from '../components/layout/Container';
import Button from '../components/ui/buttons/Button';
import { RootStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';

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
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                  >
                    전환
                  </Text>
                </Pressable>
              </View>
            </Camera>
            <Button label="촬영" onPressHandler={takePicture} />
          </>
        )}
      </Container>
    </>
    // <View style={{ flex: 1 }}>
    //   <Camera style={{ flex: 1 }} ref={cameraRef} type={CameraType.front}>
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: 'transparent',
    //         flexDirection: 'row',
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={{
    //           flex: 0.1,
    //           alignSelf: 'flex-end',
    //           alignItems: 'center',
    //           marginBottom: 16,
    //         }}
    //         onPress={takePicture}
    //       >
    //         <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
    //           Take Picture
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </Camera>
    // </View>
  );
};
export default CameraScreen;
