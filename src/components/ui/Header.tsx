import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TYPOS from './typo';
import Close24 from './icons/Close24';
import Color from '../../constants/color';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  rightContent?: React.ReactNode;
  onCustomBackButtonHandler?: () => void;
}

const Header = (props: Props) => {
  const { title, onCustomBackButtonHandler } = props;
  const navigation = useNavigation();

  const onCloseHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Pressable
        onPress={
          onCustomBackButtonHandler ? onCustomBackButtonHandler : onCloseHandler
        }
      >
        <Close24 color={Color.black} />
      </Pressable>
      <Text style={[TYPOS.headline3, styles.title]}>{title}</Text>
      <View style={styles.rightContent}>{props.rightContent}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Color.white,
  },
  title: {
    marginLeft: 8,
  },
  rightContent: {
    marginLeft: 'auto',
  },
});
