import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Color from '../../../constants/color';
import Down24 from '../../ui/icons/Down24';
import TYPOS from '../../ui/typo';

interface Props {
  title: string;
  titleIcon?: React.ReactNode;
  titleActive?: boolean;
  onPressHandler: () => void;
}

const NonCollapsibleAccordion = ({
  title,
  titleIcon,
  titleActive,
  onPressHandler,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPressHandler} style={[styles.titleContainer]}>
      {titleIcon}
      <Text
        style={[
          titleActive ? TYPOS.headline4 : TYPOS.body1,
          { color: titleActive ? Color.neutral1 : Color.neutral2 },
          styles.titleText,
        ]}
      >
        {title}
      </Text>
      <View>
        <Down24 color={Color.neutral1} />
      </View>
    </TouchableOpacity>
  );
};

export default NonCollapsibleAccordion;

const styles = StyleSheet.create({
  titleContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  titleText: {
    flex: 1,
  },
});
