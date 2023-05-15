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
import Search from '../icons/Search';
import Close from '../icons/Close';
import TYPOS from '../typo';

interface Props {
  isError?: boolean;
  errorMessage?: string;
  value?: string;
  onChangeHandler?: (vatlue: string) => void;
  placeholder?: string;
  LayoutStyle?: ViewStyle;
  disabled?: boolean;
  onSubmitEditingHandler?: () => void;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  isSearch?: boolean;
}

const InputField = (props: Props) => {
  const {
    isError,
    errorMessage,
    value,
    onChangeHandler,
    placeholder,
    LayoutStyle,
    disabled,
    onSubmitEditingHandler,
    keyboardType,
    isPassword,
    isSearch,
  } = props;

  const [hasFocus, setHasFocus] = useState(false);

  return (
    <View style={LayoutStyle}>
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
              borderColor: Color.neutral4,
            }),
          },
        ]}
      >
        {isSearch && (
          <Search
            size={24}
            {...(hasFocus && { color: Color.primary700 })}
            style={{
              marginLeft: 16,
            }}
          />
        )}
        <TextInput
          placeholder={placeholder}
          style={[
            styles.input,
            {
              ...(disabled && {
                color: Color.neutral4,
              }),
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
        />
      </View>
      {isError && !!errorMessage && (
        <View style={styles.errorWrap}>
          <Close size={16} color={Color.error} />
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
    flex: 1,
    textAlign: 'left',
    backgroundColor: Color.white,
    paddingHorizontal: 12,
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