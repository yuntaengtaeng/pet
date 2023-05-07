import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TYPOS from './typo';
import ArrowLeft from './icons/ArrowLeft';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
}

const AppBar = (props: Props) => {
  const { title } = props;

  const navigation = useNavigation();

  const onBackButtonHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onBackButtonHandler}>
        <ArrowLeft size={24} />
      </Pressable>
      <Text style={[TYPOS.headline3, styles.title]}>{title}</Text>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
  },
  title: {
    marginLeft: 16,
  },
});
