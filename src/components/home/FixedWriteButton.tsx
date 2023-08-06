import React, { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Plus32 from '../ui/icons/Plus32';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosError } from 'axios';
import { HomeDispatchContext } from './HomeDispatchContext';

const FixedWriteButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const moveEdit = async () => {
    navigation.push('EditProduct');
  };

  const dispatch = useContext(HomeDispatchContext);

  const verifyNeighborhood = async () => {
    try {
      const { data } = await axios.get('/auth/local-area');
      moveEdit();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        dispatch?.locationVerificationPopup.open();
      }
    }
  };

  return (
    <Pressable style={styles.wrap} onPress={verifyNeighborhood}>
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
