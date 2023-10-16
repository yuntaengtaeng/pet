import React, { useEffect, useRef } from 'react';
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

interface BottomSheetProps {
  isOpened: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  height: number;
}

const BottomSheet = ({
  isOpened,
  title,
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
    </Modal>
  );
};

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
