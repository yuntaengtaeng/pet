import React, { useRef } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Color from '../../constants/color';
import TYPOS from './typo';
import Pin24 from './icons/Pin24';
import FillPin24 from './icons/FillPin24';
import Bell16 from './icons/Bell16';
import PinIndicator from './icons/PinIndicator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

interface Props {
  roomId: string;
  image?: string;
  productImage?: string;
  roomName: string;
  region: string;
  timeStamp: string;
  content: string;
  isPinned?: boolean;
  isNotificationEnabled?: boolean;
  onPinPressHandler?: () => void;
  onExitPressHandler?: () => void;
  onToggleNotificationHandler?: () => void;
  setSwipeable: (ref: Swipeable | null) => void;
}

const ChatRoomItem = ({
  roomId,
  image,
  productImage,
  roomName,
  region,
  timeStamp,
  content,
  isPinned,
  isNotificationEnabled,
  onPinPressHandler,
  onExitPressHandler,
  onToggleNotificationHandler,
  setSwipeable,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const swipeableRef = useRef<Swipeable | null>(null);

  const renderLeftActions = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={{
            backgroundColor: Color.primary700,
            width: 72,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPinPressHandler}
        >
          {isPinned ? (
            <FillPin24 color={Color.white} />
          ) : (
            <Pin24 color={Color.white} />
          )}
        </Pressable>
      </View>
    );
  };

  const renderRightActions = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={{
            backgroundColor: isNotificationEnabled
              ? Color.neutral3
              : Color.neutral2,
            width: 80,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onToggleNotificationHandler}
        >
          <Text style={[{ color: Color.white }, TYPOS.body1]}>{`알림 ${
            isNotificationEnabled ? '끄기' : '켜기'
          }`}</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Color.error,
            width: 80,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onExitPressHandler}
        >
          <Text style={[{ color: Color.white }, TYPOS.body1]}>나가기</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={1.5}
      ref={swipeableRef}
      onSwipeableOpen={() => {
        setSwipeable(swipeableRef.current);
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('ChatRoom', {
            roomId: roomId,
          });
        }}
        style={{
          backgroundColor: Color.white,
          padding: 16,
          flexDirection: 'row',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {isPinned && (
          <PinIndicator
            color={Color.primary700}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
        )}
        <Image
          style={[
            {
              width: 48,
              height: 48,
              resizeMode: 'cover',
              borderRadius: 48,
              marginRight: 16,
            },
          ]}
          source={
            image
              ? { uri: image }
              : require('../../../assets/img/placeholder.png')
          }
        />
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[{ color: Color.black }, TYPOS.headline4]}>
              {roomName}
            </Text>
            <Text
              style={[
                { color: Color.neutral2, marginHorizontal: 4 },
                TYPOS.body3,
              ]}
            >
              {region}
            </Text>
            {!isNotificationEnabled && <Bell16 color={Color.neutral2} />}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              numberOfLines={1}
              style={[{ color: Color.neutral1, flex: 1 }, TYPOS.body2]}
            >
              {content}
            </Text>
            <Text
              style={[
                { color: Color.neutral2, marginHorizontal: 4 },
                TYPOS.body3,
              ]}
            >
              ·
            </Text>
            <Text style={[{ color: Color.neutral2 }, TYPOS.body3]}>
              {timeStamp}
            </Text>
          </View>
        </View>
        {productImage && (
          <Image
            style={[
              {
                width: 56,
                height: 56,
                resizeMode: 'cover',
                borderRadius: 5,
                marginLeft: 16,
              },
            ]}
            source={{ uri: productImage }}
          />
        )}
      </Pressable>
    </Swipeable>
  );
};

export default ChatRoomItem;
