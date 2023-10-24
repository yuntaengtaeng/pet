import React, { forwardRef } from 'react';
import { ViewStyle, ScrollView, View } from 'react-native';
import Chip from './Chip';

type SingleSelectedHandler = (label: string) => void;
type MultiSelectedHandler = (labels: string[]) => void;

interface Props {
  labels: string[];
  type: 'single' | 'multi';
  selectedLabel?: string | string[];
  onSelectedHandler?: SingleSelectedHandler | MultiSelectedHandler;
  containerStyle?: ViewStyle;
  chipStyle?: ViewStyle;
}

interface ScrollViewProps
  extends Props,
    React.ComponentProps<typeof ScrollView> {}

const ChipContainer =
  (Component: React.ComponentType<any>, forwardedRef?: React.Ref<ScrollView>) =>
  ({
    labels,
    type,
    selectedLabel,
    onSelectedHandler,
    containerStyle,
    chipStyle,
    ...restProps
  }: ScrollViewProps) => {
    const onPressHandler = (isActive: boolean, label: string) => {
      if (type === 'single') {
        if (isActive) {
          (onSelectedHandler as SingleSelectedHandler)?.('');
        } else {
          (onSelectedHandler as SingleSelectedHandler)?.(label);
        }
      } else if (type === 'multi') {
        const selectedLabels = Array.isArray(selectedLabel)
          ? [...selectedLabel]
          : [];

        if (isActive) {
          const index = selectedLabels.indexOf(label);
          if (index !== -1) {
            selectedLabels.splice(index, 1);
          }
        } else {
          selectedLabels.push(label);
        }

        (onSelectedHandler as MultiSelectedHandler)?.(selectedLabels);
      }
    };

    return (
      <Component style={containerStyle} ref={forwardedRef} {...restProps}>
        {labels.map((label) => {
          const isActive = Array.isArray(selectedLabel)
            ? selectedLabel.includes(label)
            : selectedLabel === label;

          return (
            <Chip
              key={label}
              label={label}
              style={chipStyle}
              isActive={isActive}
              onPressHandler={() => onPressHandler(isActive, label)}
            />
          );
        })}
      </Component>
    );
  };

export const ChipContainerView = ChipContainer(View);

export const ChipContainerScrollView = forwardRef<ScrollView, ScrollViewProps>(
  (props, forwardedRef) => ChipContainer(ScrollView, forwardedRef)(props)
);
