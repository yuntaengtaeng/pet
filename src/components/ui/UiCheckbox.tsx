import React from 'react';
import Checkbox from 'expo-checkbox';
import { StyleSheet, View, Pressable } from 'react-native';
import Color from '../../constants/color';

/*
TODO : expo-checkbox 사용하는 것을 삭제하고 직접 구현하기
- disabled color가 커스텀이 안되는 이슈
*/

interface Props {
  isChecked: boolean;
  disabled?: boolean;
  onValueChangeHandler?: (checked: boolean) => void;
  children?: React.ReactNode;
}

const UiCheckbox = (props: Props) => {
  const { isChecked, onValueChangeHandler, disabled = false, children } = props;

  const triggerCheckbox = () => {
    if (onValueChangeHandler) {
      onValueChangeHandler(!isChecked);
    }
  };

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={onValueChangeHandler}
        disabled={disabled}
        color={isChecked ? Color.primary600 : undefined}
      />
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
    width: 24,
    height: 24,
  },
  label: {
    marginLeft: 8,
  },
});
