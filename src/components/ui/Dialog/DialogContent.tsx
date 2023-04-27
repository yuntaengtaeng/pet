import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TYPOS from '../typo';
import Color from '../../../constants/color';

interface Props {
  content: string;
}

const DialogContent = (props: Props) => {
  const { content } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.content, TYPOS.body2]}>{content}</Text>
    </View>
  );
};

export default DialogContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  content: {
    color: Color.neutral1,
  },
});
