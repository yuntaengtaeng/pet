import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

interface BottomSheetProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height: number;
}

const BottomSheet = ({
  isOpened,
  onClose,
  children,
  height,
}: BottomSheetProps) => {
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

  return (
    <Modal
      visible={isOpened}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.background,
              {
                opacity: panY.interpolate({
                  inputRange: [0, screenHeight],
                  outputRange: [1, 0],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              {
                height,
                transform: [{ translateY: translateY }],
              },
            ]}
            {...panResponders.panHandlers}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 44,
                  height: 4,
                  backgroundColor: '#DEDEDE',
                  marginVertical: 8,
                }}
              ></View>
            </View>
            <View>{children}</View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheetContainer: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default BottomSheet;
