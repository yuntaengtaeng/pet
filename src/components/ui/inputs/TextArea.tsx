import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Color from '../../../constants/color';
import Close from '../icons/Close';
import TYPOS from '../typo';

interface Props {
  isError?: boolean;
  errorMessage?: string;
  value?: string;
  onChangeHandler?: (value: string) => void;
  placeholder?: string;
  layoutStyle?: ViewStyle;
  fieldStyle?: ViewStyle;
  disabled?: boolean;
  onSubmitEditingHandler?: () => void;
}

const TextArea = (props: Props) => {
  const {
    isError,
    errorMessage,
    value,
    onChangeHandler,
    placeholder,
    layoutStyle,
    fieldStyle,
    disabled,
    onSubmitEditingHandler,
  } = props;

  const [hasFocus, setHasFocus] = useState(false);

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
              borderColor: Color.neutral4,
            }),
          },
          fieldStyle,
        ]}
      >
        <TextInput
          multiline={true}
          placeholder={placeholder}
          style={[
            styles.input,
            {
              ...(disabled && {
                color: Color.neutral4,
              }),
            },
            TYPOS.body1,
            {
              lineHeight: undefined,
            },
          ]}
          value={value}
          editable={!disabled}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            if (onChangeHandler) {
              onChangeHandler(event.nativeEvent.text);
            }
          }}
          onFocus={() => {
            setHasFocus(true);
          }}
          onBlur={() => {
            setHasFocus(false);
          }}
          onSubmitEditing={onSubmitEditingHandler}
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

export default TextArea;

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutral3,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    textAlign: 'left',
    height: '100%',
    backgroundColor: Color.white,
    marginHorizontal: 16,
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
