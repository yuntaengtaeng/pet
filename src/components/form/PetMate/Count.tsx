import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import Color from '../../../constants/color';
import Dog24 from '../../ui/icons/Dog24';
import TYPOS from '../../ui/typo';
import Minus24 from '../../ui/icons/Minus24';
import Plus24 from '../../ui/icons/Plus24';

interface Props {
  count: number;
  max: number;
  min: number;
  onPlusHandler: () => void;
  onMinusHandler: () => void;
  containerStyle?: ViewStyle;
}

const Count = ({
  count,
  max,
  min,
  onPlusHandler,
  onMinusHandler,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.wrap, containerStyle]}>
      <View style={styles.child}>
        <Dog24 color={Color.black} style={{ marginRight: 8 }} />
        <Text style={[TYPOS.body1, { color: Color.neutral2 }]}>모집견수</Text>
      </View>
      <View style={styles.child}>
        <Pressable
          style={styles.button}
          onPress={onMinusHandler}
          disabled={min === count}
        >
          <Minus24 color={Color.neutral1} />
        </Pressable>
        <Text style={[TYPOS.body1, { color: Color.neutral1 }, styles.count]}>
          {count}
        </Text>
        <Pressable
          style={styles.button}
          onPress={onPlusHandler}
          disabled={max === count}
        >
          <Plus24 color={Color.neutral1} />
        </Pressable>
      </View>
    </View>
  );
};

export default Count;

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Color.neutral2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    marginHorizontal: 8,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
