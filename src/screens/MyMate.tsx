import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppBar from '../components/ui/AppBar';
import { ScrollView, View } from 'react-native';
import Color from '../constants/color';
import MateCard from '../components/ui/MateCard';
import Tabs from '../components/ui/Tabs';
import Line from '../components/form/PetMate/Line';
import React, { useEffect, useState } from 'react';
import UpcomingWalkList from '../components/petMate/UpcomingWalkList';
import { MyMatePost } from '../types/interface';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import axios from 'axios';

export type AddPetMateScreenProps = StackScreenProps<
  RootStackParamList,
  'MyMate'
>;

const MyMate = ({ navigation, route }: AddPetMateScreenProps) => {
  const setIsLoading = useSetRecoilState(LoadingState);
  const [list, setList] = useState<MyMatePost[]>([]);
  const [tab, setTab] = useState(0);

  const getParticipationWalkScheduleList = () => {
    return axios.get<{ participationWalkScheduleList: MyMatePost[] }>(
      '/board/pet-mate/participants'
    );
  };

  const getWrittenPosts = () => {
    return axios.get<{ writtenPosts: MyMatePost[] }>('/board/pet-mate/posts');
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        let tempList: MyMatePost[] = [];

        if (tab === 0) {
          const result = await getParticipationWalkScheduleList();
          tempList = result.data.participationWalkScheduleList;
        } else {
          const result = await getWrittenPosts();
          tempList = result.data.writtenPosts;
        }

        setList(tempList);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [tab]);

  return (
    <>
      <AppBar title="나의 메이트" />
      <ScrollView
        style={{ flex: 1, backgroundColor: Color.neutral5 }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <UpcomingWalkList
          containerStyle={{
            marginTop: 24,
            marginBottom: 16,
            marginHorizontal: 16,
          }}
          hasMoreButton={true}
        />
        <Tabs
          selectedIndex={tab}
          onSelectHandler={(index) => {
            setTab(index);
          }}
          menu={['참여한 산책', '작성한 글']}
        />
        <View>
          {list.map((item) => (
            <React.Fragment key={item.id}>
              <MateCard
                gap={4}
                title={item.title}
                description={`${item.address} · ${item.date}`}
                descriptionSize={3}
              />
              <Line />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default MyMate;
