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

export const Neutral = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.black }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          black({Color.black})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.neutral1 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          neutral1({Color.neutral1})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.neutral2 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          neutral2({Color.neutral2})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.neutral3 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          neutral3({Color.neutral3})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.neutral4 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          neutral4({Color.neutral4})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.neutral5 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          neutral5({Color.neutral5})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.white }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          white({Color.white})
        </Text>
      </View>
    </View>
  );
};

export const Primary = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary900 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary900({Color.primary900})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary800 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary800({Color.primary800})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary700 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary700({Color.primary700})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary600 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary600({Color.primary600})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary500 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary500({Color.primary500})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary400 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary400({Color.primary400})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary300 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary300({Color.primary300})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary200 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary200({Color.primary200})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary100 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary100({Color.primary100})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.primary50 }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          primary50({Color.primary50})
        </Text>
      </View>
    </View>
  );
};

export const States = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.success }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          success({Color.success})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.successBg }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          successBg({Color.successBg})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.warning }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          warning({Color.warning})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.warningBg }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          warningBg({Color.warningBg})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.info }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>info({Color.info})</Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.infoBg }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          infoBg({Color.infoBg})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.error }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          error({Color.error})
        </Text>
      </View>
      <View>
        <View
          style={{ width: 100, height: 100, backgroundColor: Color.errorBg }}
        ></View>
        <Text style={[TYPOS.body1, { marginTop: 8 }]}>
          errorBg({Color.errorBg})
        </Text>
      </View>
    </View>
  );
};
