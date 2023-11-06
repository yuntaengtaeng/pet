import { FlatList, View, Text } from 'react-native';
import Color from '../../constants/color';
import FixedWriteButton from '../ui/FixedWriteButton';
import RecruitmentCard from '../ui/RecruitmentCard';
import UiCheckbox from '../ui/UiCheckbox';
import TYPOS from '../ui/typo';

const dummy_data = [
  {
    status: '모집마감',
    title: '중랑천 산책하실 분~',
    description: '공릉동 · 10/20 (목), 오후 8시',
    limit: {
      current: 3,
      max: 10,
    },
  },
  {
    status: '모집중',
    title: '중랑천 산책하실 분!!!',
    description: '공릉동 · 10/20 (목), 오후 8시',
    limit: {
      current: 5,
      max: 10,
    },
  },
];

const Recruitment = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: Color.white,
          padding: 16,
          alignItems: 'flex-end',
        }}
      >
        <UiCheckbox isChecked={false} size="small">
          <Text style={[TYPOS.body2, { color: Color.neutral1 }]}>
            모집중인 글만 보기
          </Text>
        </UiCheckbox>
      </View>
      <FlatList
        style={{
          height: '100%',
          backgroundColor: Color.white,
          paddingTop: 24,
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={dummy_data}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: Color.neutral4,
              marginVertical: 16,
            }}
          ></View>
        )}
        renderItem={({ item }) => (
          <RecruitmentCard
            key={item.title}
            status={item.status as '모집중' | '모집마감'}
            title={item.title}
            description={item.description}
            limit={item.limit}
          />
        )}
      />
      <FixedWriteButton onPressHandler={() => {}} />
    </>
  );
};

export default Recruitment;
