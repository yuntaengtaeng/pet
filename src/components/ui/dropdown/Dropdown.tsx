import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Color from '../../../constants/color';
import useModal from '../../../hooks/useModal';
import ListValue from './ListValue';
import { ScrollView } from 'react-native-gesture-handler';
import SHADOWS from '../shadow';

interface Props {
  list: string[];
  onLabelClickHandler?: (label: string) => void;
  selectedLabel?: string;
  layoutStyle?: ViewStyle;
  disabled?: boolean;
}

const FULL_HEIGHT = Dimensions.get('window').height;
const SCROLL_VIEW_MAX_HEIGHT = 240;

const Dropdown = ({
  list,
  selectedLabel = '',
  onLabelClickHandler,
  layoutStyle,
  disabled,
}: Props) => {
  const { isVisible, openModal, closeModal } = useModal();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [width, setWidth] = useState(0);
  const touchableOpacityRef = useRef<TouchableOpacity | null>(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    touchableOpacityRef.current?.measure(
      (_x, _y, width, height, _pageX, pageY) => {
        setWidth(width);

        if (
          FULL_HEIGHT -
            (pageY +
              height +
              12 +
              Math.min(SCROLL_VIEW_MAX_HEIGHT, list.length * 48)) >
          10
        ) {
          setDropdownTop(pageY + height + 12);
        } else {
          setDropdownTop(
            pageY - Math.min(SCROLL_VIEW_MAX_HEIGHT, list.length * 48) - 12
          );
        }
      }
    );
  }, [isVisible]);

  return (
    <View style={layoutStyle}>
      <TouchableOpacity
        activeOpacity={1}
        ref={touchableOpacityRef}
        disabled={disabled}
        onPress={openModal}
        style={[
          styles.fieldContainer,
          {
            ...(isVisible && {
              borderColor: Color.primary700,
            }),
            ...(disabled && {
              borderColor: Color.neutral4,
            }),
          },
        ]}
      >
        <ListValue label={selectedLabel} />
      </TouchableOpacity>
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
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
                  width,
                  position: 'absolute',
                  zIndex: 10,
                  top: dropdownTop,
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  maxHeight: SCROLL_VIEW_MAX_HEIGHT,
                },
                SHADOWS.shadow4,
              ]}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {list.map((l) => (
                  <ListValue
                    key={l}
                    onClickHandler={(label) => {
                      closeModal();
                      if (onLabelClickHandler) {
                        onLabelClickHandler(label);
                      }
                    }}
                    label={l}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  fieldContainer: {
    height: 48,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutral3,
    alignItems: 'center',
  },
});
