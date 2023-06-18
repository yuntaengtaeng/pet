import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import TYPOS from '.';

const meta = {
  title: 'Design System/Typo',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj;

/** fontSize: 24, fontWeight: '600', lineHeight: 32, fontFamily: 'Pretendard_SemiBold'  */
export const Headline1 = () => <Text style={TYPOS.headline1}>headline1</Text>;
Headline1.storyName = 'Headline 1';

/** fontSize: 20, fontWeight: '600', lineHeight: 24, fontFamily: 'Pretendard_SemiBold'  */
export const Headline2 = () => <Text style={TYPOS.headline2}>headline2</Text>;
Headline2.storyName = 'Headline 2';

/** fontSize: 16, fontWeight: '600', lineHeight: 24, fontFamily: 'Pretendard_SemiBold', */
export const Headline3 = () => <Text style={TYPOS.headline3}>headline3</Text>;
Headline3.storyName = 'Headline 2';

/** fontSize: 16, fontWeight: '600', lineHeight: 20, fontFamily: 'Pretendard_SemiBold', */
export const Headline4 = () => <Text style={TYPOS.headline4}>headline4</Text>;
Headline4.storyName = 'Headline 2';

/** fontSize: 16, fontWeight: '400', lineHeight: 24, fontFamily: 'Pretendard_Regular', */
export const Body1 = () => <Text style={TYPOS.body1}>body1</Text>;
Body1.storyName = 'body 1';

/** fontSize: 14, fontWeight: '400', lineHeight: 20, fontFamily: 'Pretendard_Regular', */
export const Body2 = () => <Text style={TYPOS.body1}>body2</Text>;
Body2.storyName = 'body 2';

/** fontSize: 12, fontWeight: '400', lineHeight: 16, fontFamily: 'Pretendard_Regular', */
export const Body3 = () => <Text style={TYPOS.body3}>body3</Text>;
Body3.storyName = 'body 3';

/** fontSize: 18, fontWeight: '400', lineHeight: 24, fontFamily: 'Pretendard_Medium', */
export const Normal = () => <Text style={TYPOS.normal}>normal</Text>;
Normal.storyName = 'Normal';

/** fontSize: 16, fontWeight: '400', lineHeight: 20, fontFamily: 'Pretendard_Medium', */
export const Medium = () => <Text style={TYPOS.medium}>medium</Text>;
Medium.storyName = 'Medium';

/** fontSize: 14, fontWeight: '400', lineHeight: 16, fontFamily: 'Pretendard_Medium', */
export const Small = () => <Text style={TYPOS.small}>small</Text>;
Small.storyName = 'Small';
