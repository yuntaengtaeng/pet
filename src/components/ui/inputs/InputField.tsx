import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  KeyboardTypeOptions,
} from 'react-native';
import Color from '../../../constants/color';
import Close16 from '../icons/Close16';
import TYPOS from '../typo';

interface Props {
  isError?: boolean;
  errorMessage?: string;
  value?: string;
  onChangeHandler?: (vatlue: string) => void;
  placeholder?: string;
  layoutStyle?: ViewStyle;
  disabled?: boolean;
  onSubmitEditingHandler?: () => void;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  leftIcon?: (hasFocus: boolean) => React.ReactNode;
}

const InputField = (props: Props) => {
  const {
    isError,
    errorMessage,
    value,
    onChangeHandler,
    placeholder,
    layoutStyle,
    disabled,
    onSubmitEditingHandler,
    keyboardType,
    isPassword,
    leftIcon,
  } = props;

  const [hasFocus, setHasFocus] = useState(false);

  const LeftIconElem = leftIcon && leftIcon(hasFocus);

  return (
    <View style={layoutStyle}>
      <View
        style={[
          styles.fieldContainer,
          {
            ...(hasFocus && {
              borderColor: Color.primary700,
            }),
            ...(isError && {
              borderColor: Color.error,
            }),
            ...(disabled && {
              borderColor: Color.neutral3,
            }),
          },
        ]}
      >
        {LeftIconElem}
        <TextInput
          placeholder={placeholder}
          style={[
            styles.input,
            {
              ...(disabled && {
                color: Color.neutral3,
              }),
            },
            TYPOS.body1,
            {
              lineHeight: undefined,
            },
          ]}
          value={value}
          editable={!disabled}
          onChange={(evnet: NativeSyntheticEvent<TextInputChangeEventData>) => {
            if (onChangeHandler) {
              onChangeHandler(evnet.nativeEvent.text);
            }
          }}
          onFocus={() => {
            setHasFocus(true);
          }}
          onBlur={() => {
            setHasFocus(false);
          }}
          onSubmitEditing={onSubmitEditingHandler}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          returnKeyType={
            ['phone-pad', 'numeric'].includes(keyboardType || '')
              ? 'done'
              : 'default'
          }
          placeholderTextColor={disabled ? Color.neutral3 : Color.neutral2}
        />
      </View>
      {isError && !!errorMessage && (
        <View style={styles.errorWrap}>
          <Close16 color={Color.error} />
          <Text style={[styles.errorMessage, TYPOS.body3]}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  fieldContainer: {
    height: 48,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutral3,
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 16,
    flex: 1,
    textAlign: 'left',
    backgroundColor: Color.white,
    color: Color.neutral1,
  },
  errorInput: {
    borderColor: Color.error,
  },
  errorMessage: {
    color: Color.error,
  },
  errorWrap: {
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
