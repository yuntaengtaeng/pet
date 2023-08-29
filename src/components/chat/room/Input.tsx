import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  Pressable,
  Keyboard,
  Text,
} from 'react-native';
import Color from '../../../constants/color';
import Plus24 from '../../ui/icons/Plus24';
import Send24 from '../../ui/icons/Send24';
import useDidUpdate from '../../../hooks/useDidUpdate';
import useInputState from '../../../hooks/useInputState';
import Close24 from '../../ui/icons/Close24';
import TYPOS from '../../ui/typo';
import Image24 from '../../ui/icons/Image24';
import Camera24 from '../../ui/icons/Camera24';
import Calendar24 from '../../ui/icons/Calendar24';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation';

type MyScreenRouteProp = RouteProp<RootStackParamList, 'AppointmentScheduler'>;

const Input = () => {
  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useInputState();
  const textInputRef = useRef<TextInput | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    params: { roomId },
  } = useRoute<MyScreenRouteProp>();

  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(
          (statusBarFrameData: { height: React.SetStateAction<number> }) => {
            setStatusBarHeight(statusBarFrameData.height);
          }
        )
      : null;
  }, []);

  useDidUpdate(() => {
    if (isMenuOpen) {
      Keyboard.dismiss();
    } else {
      textInputRef.current?.focus();
    }
  }, [isMenuOpen]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight}
    >
      <View
        style={{
          backgroundColor: Color.white,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Pressable
            style={{ marginRight: 8 }}
            onPress={() => {
              setIsMenuOpen((prev) => !prev);
            }}
          >
            {isMenuOpen ? (
              <Close24 color={Color.neutral1} />
            ) : (
              <Plus24 color={Color.neutral1} />
            )}
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              backgroundColor: Color.neutral5,
              borderRadius: 20,
              padding: 8,
            }}
          >
            <TextInput
              ref={textInputRef}
              multiline={true}
              numberOfLines={5}
              selectionColor={Color.primary700}
              placeholder="메세지를 입력하세요."
              placeholderTextColor={Color.neutral3}
              style={[
                TYPOS.body2,
                {
                  flex: 1,
                  color: Color.neutral1,
                  lineHeight: undefined,
                  maxHeight: 100,
                },
              ]}
              value={text}
              onChangeText={setText}
            />
            <Pressable style={{ marginLeft: 8 }}>
              <Send24 color={text.length ? Color.primary700 : Color.neutral3} />
            </Pressable>
          </View>
        </View>
        {isMenuOpen && (
          <View
            style={{
              height: 280,
              paddingTop: 32,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <View style={{ alignSelf: 'flex-start' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 48,
                  borderWidth: 1,
                  borderColor: Color.neutral4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Image24 color={Color.neutral1} />
              </View>
              <Text style={[TYPOS.body2, { color: Color.black }]}>
                사진 전송
              </Text>
            </View>
            <View style={{ alignSelf: 'flex-start' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 48,
                  borderWidth: 1,
                  borderColor: Color.neutral4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Camera24 color={Color.neutral1} />
              </View>
              <Text style={[TYPOS.body2, { color: Color.black }]}>
                사진 촬영
              </Text>
            </View>
            <Pressable
              style={{ alignSelf: 'flex-start' }}
              onPress={() => {
                navigation.push('AppointmentScheduler', { roomId });
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 48,
                  borderWidth: 1,
                  borderColor: Color.neutral4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Calendar24 color={Color.neutral1} />
              </View>
              <Text style={[TYPOS.body2, { color: Color.black }]}>
                약속 잡기
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Input;
