import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';
import Down24 from './icons/Down24';

interface Props {
  value?: string;
  layoutStyle?: ViewStyle;
  disabled?: boolean;
  placeholder?: string;
  onPressHandler?: () => void;
}

const Selectable = ({
  value = '',
  layoutStyle,
  disabled,
  placeholder,
  onPressHandler,
}: Props) => {
  return (
    <View style={layoutStyle}>
      <Pressable
        disabled={disabled}
        onPress={onPressHandler}
        style={[
          styles.fieldContainer,
          {
            ...(disabled && {
              borderColor: Color.neutral4,
            }),
          },
        ]}
      >
        <Text
          style={[
            {
              color: value ? Color.neutral1 : Color.neutral2,
            },
            TYPOS.body1,
          ]}
        >
          {value ? value : placeholder}
        </Text>

        <Down24 color={Color.neutral2} />
      </Pressable>
    </View>
  );
};

export default Selectable;

const styles = StyleSheet.create({
  fieldContainer: {
    height: 48,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutral3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
