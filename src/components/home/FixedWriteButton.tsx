import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Plus from '../ui/icons/Plus';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const FixedWriteButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const moveEdit = () => {
    navigation.push('EditProduct');
  };
  return (
    <Pressable style={styles.wrap} onPress={moveEdit}>
      <Plus size={32} color={Color.white} />
    </Pressable>
  );
};

export default FixedWriteButton;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Color.primary700,
    width: 48,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
