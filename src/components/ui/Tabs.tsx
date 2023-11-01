import { View, Pressable, Text, Animated, Dimensions } from 'react-native';
import Color from '../../constants/color';
import TYPOS from '../ui/typo';
import React from 'react';

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menu: string[];
}

const Tabs = ({ selectedIndex, onSelectHandler, menu }: Props) => {
  const width = Dimensions.get('window').width / menu.length;
  const animatedValue = React.useRef(
    new Animated.Value(selectedIndex * width)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedIndex * width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: Color.white }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          width: width,
          borderBottomWidth: 1,
          borderBottomColor: Color.primary700,
          transform: [{ translateX: animatedValue }],
          bottom: 0,
        }}
      />
      {menu.map((v, i) => (
        <Pressable
          style={{
            flex: 1,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={v}
          onPress={() => {
            onSelectHandler(i);
          }}
        >
          <Text
            style={[
              TYPOS.normal,
              {
                color: selectedIndex === i ? Color.primary700 : Color.neutral1,
              },
            ]}
          >
            {v}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;
