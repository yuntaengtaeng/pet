import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TYPOS from './typo';
import Left24 from './icons/Left24';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onCustomBackButtonHandler?: () => void;
}

const AppBar = (props: Props) => {
  const { title, onCustomBackButtonHandler } = props;

  const navigation = useNavigation();

  const onBackButtonHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Pressable
        onPress={
          onCustomBackButtonHandler
            ? onCustomBackButtonHandler
            : onBackButtonHandler
        }
      >
        <Left24 color={Color.black} />
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
    marginLeft: 8,
  },
  title: {
    marginLeft: 8,
  },
  rightContent: {
    marginLeft: 'auto',
  },
});
