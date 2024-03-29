import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import Check16 from './icons/Check16';
import Color from '../../constants/color';

interface Props {
  isChecked: boolean;
  disabled?: boolean;
  onValueChangeHandler?: (checked: boolean) => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  size?: 'small' | 'medium';
}

const SIZE_MAP = {
  small: 16,
  medium: 24,
};

const UiCheckbox = (props: Props) => {
  const {
    isChecked,
    disabled,
    onValueChangeHandler,
    children,
    style,
    size = 'medium',
  } = props;

  const onPressedHandler = () => {
    if (onValueChangeHandler) {
      onValueChangeHandler(!isChecked);
    }
  };

  const triggerCheckbox = () => {
    if (!disabled) {
      onPressedHandler();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        disabled={disabled}
        onPress={onPressedHandler}
        style={[
          styles.checkbox,
          isChecked && styles.checked,
          disabled && styles.disabled,
          isChecked && disabled && styles.checkedAndDisabled,
          {
            width: SIZE_MAP[size],
            height: SIZE_MAP[size],
          },
        ]}
      >
        {isChecked && (
          <Check16 color={disabled ? Color.neutral3 : Color.white} />
        )}
      </Pressable>
      {children && (
        <Pressable style={styles.label} onPress={triggerCheckbox}>
          {children}
        </Pressable>
      )}
    </View>
  );
};

export default UiCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Color.neutral3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: Color.primary700,
    borderColor: Color.primary700,
  },
  disabled: {
    borderColor: Color.neutral3,
    backgroundColor: Color.neutral3,
  },
  checkedAndDisabled: {
    backgroundColor: Color.primary100,
    borderColor: Color.primary100,
  },
  label: {
    marginLeft: 8,
  },
});
