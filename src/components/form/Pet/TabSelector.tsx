import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Text, Animated } from 'react-native';
import Color from '../../../constants/color';
import TYPOS from '../../ui/typo';

export type Tap = 0 | 1;

interface Props {
  selectedTap: Tap;
  onSelectedHandler: (tap: Tap) => void;
}

const TabSelector = ({ selectedTap, onSelectedHandler }: Props) => {
  const animation = useRef(
    new Animated.Value(selectedTap ? selectedTap : 0)
  ).current;

  const [layoutWidth, setLayoutWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: selectedTap ? selectedTap : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selectedTap]);

  const marginLeft = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, layoutWidth / 2 - 2],
  });

  return (
    <View
      style={{
        height: 32,
        flexDirection: 'row',
        backgroundColor: Color.neutral5,
        borderRadius: 35,
        position: 'relative',
        alignItems: 'center',
      }}
      onLayout={(event) => setLayoutWidth(event.nativeEvent.layout.width)}
    >
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
        onPress={() => {
          onSelectedHandler(0);
        }}
      >
        <Text
          style={[
            TYPOS.body2,
            { color: selectedTap === 0 ? Color.white : Color.neutral1 },
          ]}
        >
          목록에서 선택
        </Text>
      </Pressable>
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
        onPress={() => {
          onSelectedHandler(1);
        }}
      >
        <Text
          style={[
            TYPOS.body2,
            { color: selectedTap === 1 ? Color.white : Color.neutral1 },
          ]}
        >
          직접 입력
        </Text>
      </Pressable>

      <Animated.View
        style={{
          position: 'absolute',
          width: '50%',
          backgroundColor: Color.primary700,
          height: 28,
          borderRadius: 35,
          marginLeft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Animated.View>
    </View>
  );
};

export default TabSelector;
