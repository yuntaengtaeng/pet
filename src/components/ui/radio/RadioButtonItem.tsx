import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { RadioGroupContext } from './RadioButtonGroup';
import Color from '../../../constants/color';

interface props {
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

const RadioButtonItem = (props: props) => {
  const { value, children, disabled, containerStyle } = props;
  const { onSelected, selected } = useContext(RadioGroupContext);

  const isSelected = () => {
    return selected === value;
  };

  const triggerRadioButton = () => {
    if (onSelected && !disabled) {
      onSelected(value);
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (onSelected && !disabled) {
          onSelected(value);
        }
      }}
      style={[styles.radioButtonItemContainer, containerStyle]}
    >
      <View
        style={[
          styles.radioButtonCircle,
          { borderColor: isSelected() ? Color.primary700 : Color.neutral3 },
          {
            ...(disabled && {
              backgroundColor: Color.primary100,
              borderColor: Color.primary100,
            }),
          },
        ]}
      >
        {isSelected() && (
          <View
            style={{
              backgroundColor: disabled ? Color.neutral4 : Color.primary700,
              width: 12,
              height: 12,
              borderRadius: 50,
            }}
          />
        )}
      </View>
      {children && (
        <Pressable style={styles.label} onPress={triggerRadioButton}>
          {children}
        </Pressable>
      )}
    </Pressable>
  );
};

export default RadioButtonItem;

const styles = StyleSheet.create({
  radioButtonItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonCircle: {
    borderWidth: 1,
    padding: 2,
    width: 24,
    height: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 8,
  },
});
