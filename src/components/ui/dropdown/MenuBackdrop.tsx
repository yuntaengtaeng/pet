import { Modal, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import Color from '../../../constants/color';
import SHADOWS from '../shadow';
import React from 'react';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
  close: () => void;
  menuStyle?: ViewStyle;
}

const MenuBackdrop = ({ children, isVisible, close, menuStyle }: Props) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={close}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              {
                position: 'absolute',
                zIndex: 10,
                borderRadius: 8,
                backgroundColor: Color.white,
                maxHeight: 240,
              },
              SHADOWS.shadow4,
              menuStyle,
            ]}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MenuBackdrop;
