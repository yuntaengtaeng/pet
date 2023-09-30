import React, { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Plus32 from '../ui/icons/Plus32';
import Color from '../../constants/color';
import { HomeDispatchContext } from './HomeDispatchContext';
import SHADOWS from '../ui/shadow';

const FixedWriteButton = () => {
  const dispatch = useContext(HomeDispatchContext);

  return (
    <Pressable
      style={[styles.wrap, SHADOWS.shadow4]}
      onPress={dispatch?.verifyNeighborhood}
    >
      <Plus32 color={Color.white} />
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
