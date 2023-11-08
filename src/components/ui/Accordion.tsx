import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Color from '../../constants/color';
import Down24 from './icons/Down24';
import TYPOS from './typo';

interface Props {
  title: string;
  titleIcon?: React.ReactNode;
  titleActive?: boolean;
  collapseOnStart?: boolean;
  children: React.ReactNode;
}

const Accordion = ({
  collapseOnStart = true,
  titleActive = false,
  children,
  title,
  titleIcon,
}: Props): JSX.Element => {
  const dropDownAnimValueRef = useRef(new Animated.Value(0));
  const rotateAnimValueRef = useRef(new Animated.Value(0));
  const fadeItemAnim = useRef(new Animated.Value(0)).current;
  const [itemHeight, setItemHeight] = useState(0);
  const [collapsed, setCollapsed] = useState(collapseOnStart);

  useEffect(() => {
    Animated.timing(fadeItemAnim, {
      toValue: collapsed ? 0 : 1,
      duration: !collapsed ? 300 : 100,
      useNativeDriver: false,
    }).start();
  }, [fadeItemAnim, collapsed]);

  useEffect(() => {
    const targetValue = collapsed ? 0 : 1;

    const config = {
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
      toValue: targetValue,
    };

    Animated.parallel([
      Animated.timing(rotateAnimValueRef.current, config),
      Animated.timing(dropDownAnimValueRef.current, config),
    ]).start();
  }, [collapsed]);

  const toggleElContainer = (
    <Animated.View
      style={[
        {
          transform: [
            {
              rotate: rotateAnimValueRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Down24 color={Color.neutral1} />
    </Animated.View>
  );

  return (
    <Animated.View style={[styles.container]}>
      {/* Invisible: Place it at the top for z-index */}
      <View
        onLayout={(e) => {
          setItemHeight(e.nativeEvent.layout.height);
        }}
        style={styles.invisibleContainer}
      >
        {children}
      </View>

      {/* Title */}
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={[styles.titleContainer]}
      >
        {titleIcon}
        <Text
          style={[
            titleActive ? TYPOS.headline4 : TYPOS.body1,
            { color: titleActive ? Color.neutral1 : Color.neutral2 },
            styles.titleText,
          ]}
        >
          {title}
        </Text>
        {toggleElContainer}
      </TouchableOpacity>
      {/* Item */}
      <Animated.View
        accessibilityState={{ expanded: !collapsed }}
        style={[
          styles.itemContainer,
          {
            opacity: fadeItemAnim,
            height: dropDownAnimValueRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, itemHeight],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  invisibleContainer: {
    position: 'absolute',
    opacity: 0,
  },
  titleContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  titleText: {
    flex: 1,
  },
  itemContainer: {},
});

export default Accordion;
