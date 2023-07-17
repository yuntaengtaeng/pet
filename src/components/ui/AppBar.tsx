import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TYPOS from './typo';
import ArrowLeft from './icons/ArrowLeft';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
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
      {props.leftContent && (
        <View style={styles.leftContent}>{props.leftContent}</View>
      )}
      <Text style={[TYPOS.headline3, styles.title]}>{title}</Text>
      <View style={styles.rightContent}>{props.rightContent}</View>
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
  leftContent: {
    marginLeft: 16,
  },
  title: {
    marginLeft: 16,
  },
  rightContent: {
    marginLeft: 'auto',
  },
});
