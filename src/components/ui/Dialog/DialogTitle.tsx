import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TYPOS from '../typo';
import Color from '../../../constants/color';

interface Props {
  title: string;
}

const DialogTitle = (props: Props) => {
  const { title } = props;

  return (
    <View>
      <Text style={[TYPOS.headline2, styles.title]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingBottom: 16,
    color: Color.neutral1,
  },
});
export default DialogTitle;
