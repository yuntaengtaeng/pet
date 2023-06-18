import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TYPOS from './typo';

const meta = {
  title: 'Design System/Color',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Black = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.black }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.black}</Text>
  </View>
);

export const Neutral1 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.neutral1 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.neutral1}</Text>
  </View>
);

export const Neutral2 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.neutral2 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.neutral2}</Text>
  </View>
);

export const Neutral3 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.neutral3 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.neutral3}</Text>
  </View>
);

export const Neutral4 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.neutral4 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.neutral4}</Text>
  </View>
);

export const Neutral5 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.neutral5 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.neutral5}</Text>
  </View>
);

export const White = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.white }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.white}</Text>
  </View>
);

export const Primary900 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary900 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary900}</Text>
  </View>
);

export const Primary800 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary800 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary800}</Text>
  </View>
);

export const Primary700 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary700 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary700}</Text>
  </View>
);

export const Primary600 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary600 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary600}</Text>
  </View>
);

export const Primary500 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary500 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary500}</Text>
  </View>
);

export const Primary400 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary400 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary400}</Text>
  </View>
);

export const Primary300 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary300 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary300}</Text>
  </View>
);

export const Primary200 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary200 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary200}</Text>
  </View>
);

export const Primary100 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary100 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary100}</Text>
  </View>
);

export const Primary50 = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.primary50 }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.primary50}</Text>
  </View>
);

export const Success = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.success }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.success}</Text>
  </View>
);

export const SuccessBg = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.successBg }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.successBg}</Text>
  </View>
);

export const Warning = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.warning }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.warning}</Text>
  </View>
);

export const WarningBg = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.warningBg }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.warningBg}</Text>
  </View>
);

export const Info = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.info }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.info}</Text>
  </View>
);

export const InfoBg = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.infoBg }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.infoBg}</Text>
  </View>
);

export const Error = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.error }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.error}</Text>
  </View>
);

export const ErrorBg = () => (
  <View>
    <View
      style={{ width: 100, height: 100, backgroundColor: Color.errorBg }}
    ></View>
    <Text style={[TYPOS.body1, { marginTop: 8 }]}>{Color.errorBg}</Text>
  </View>
);
