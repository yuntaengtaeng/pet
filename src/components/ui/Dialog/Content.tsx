import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TYPOS from '../typo';
import Color from '../../../constants/color';

interface Props {
  content: string;
}

const Content = (props: Props) => {
  const { content } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.content, TYPOS.body1]}>{content}</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  content: {
    color: Color.neutral1,
  },
});
