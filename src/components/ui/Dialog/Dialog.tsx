import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import Color from '../../../constants/color';

interface Props {
  children: React.ReactNode;
  isOpened: boolean;
  outSideClickHandler?: () => void;
}

const Dialog = (props: Props) => {
  const { children, isOpened, outSideClickHandler } = props;

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isOpened}>
        <Pressable
          onPress={(event) => {
            if (event.target === event.currentTarget && outSideClickHandler) {
              outSideClickHandler();
            }
          }}
          style={styles.container}
        >
          <View style={styles.modal}>{children}</View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    padding: 24,
    backgroundColor: Color.white,
    width: '100%',
    borderRadius: 20,
  },
});
