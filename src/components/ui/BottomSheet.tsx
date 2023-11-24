import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
} from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useToastState from '../../hooks/useToastState';
import ToastMessage from './toast/ToastMessage';

interface BottomSheetProps {
  isOpened: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
}

export interface BottomSheetRef {
  showToastMessage: (message: string) => void;
}

/*
  legacy
  
  Modal 위에서 Toast를 띄울 수 없는 상황으로 ToastContainer의 기능을 사용하지 않고
  직접 ToastMessage 컴포넌트를 Modal 내부에서 랜더링 시키도록 구현
  BottomSheet를 사용하는 곳에서 ToastMessage를 띄우기 위해 showToastMessage를 useImperativeHandle 이용하여 부모 컴포넌트에서 접근이 가능하도록 구현
*/

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ isOpened, title, onClose, children, height }, ref) => {
    const [toastState, showToastMessage] = useToastState();
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('screen').height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    });

    const panResponders = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
          panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
          if (
            gestureState.dy > 0 &&
            (gestureState.dy > 80 || gestureState.vy > 1.5)
          ) {
            closeModal();
          } else {
            resetBottomSheet.start();
          }
        },
      })
    ).current;

    useEffect(() => {
      if (isOpened) {
        resetBottomSheet.start();
      }
    }, [isOpened]);

    const closeModal = () => {
      closeBottomSheet.start(() => {
        onClose();
      });
    };

    useImperativeHandle(ref, () => ({
      showToastMessage: (message: string) => {
        showToastMessage(message);
      },
    }));

    return (
      <Modal animationType="fade" transparent={true} visible={isOpened}>
        <Pressable
          onPress={() => {
            closeModal();
          }}
          style={styles.overlay}
        ></Pressable>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              height,
              transform: [{ translateY: translateY }],
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View {...panResponders.panHandlers}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 44,
                  height: 4,
                  backgroundColor: '#DEDEDE',
                  marginVertical: 8,
                  borderRadius: 4,
                }}
              ></View>
            </View>
            <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
              <Text style={[TYPOS.headline3, { color: Color.black }]}>
                {title}
              </Text>
            </View>
          </View>
          <View>{children}</View>
        </Animated.View>
        {toastState.isVisible && <ToastMessage message={toastState.message} />}
      </Modal>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheetContainer: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});
