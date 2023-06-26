import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import Color from '../../constants/color';

interface Props {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  containerStyle?: ViewStyle;
}

const UiSwitch = (props: Props) => {
  const { isOn, onToggle } = props;
  const [aniValue] = useState<Animated.Value>(new Animated.Value(0));

  const [backgroundColor, toggleSwitchColor] = isOn
    ? [Color.primary700, Color.white]
    : [Color.white, Color.neutral3];

  const moveSwitchToggle = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24],
  });

  Animated.timing(aniValue, {
    toValue: isOn ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Pressable
        onPress={() => {
          onToggle(!isOn);
        }}
      >
        <View
          style={[styles.toggleContainer, { backgroundColor: backgroundColor }]}
        >
          <Animated.View
            style={[
              styles.toggle,
              {
                transform: [{ translateX: moveSwitchToggle }],
                backgroundColor: toggleSwitchColor,
              },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 48,
    height: 24,
    borderRadius: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.neutral3,
  },
  toggle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginLeft: 4,
  },
});

export default UiSwitch;
