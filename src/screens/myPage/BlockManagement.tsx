import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { useSetRecoilState } from 'recoil';
import EmptyList from '../../components/myPage/EmptyList';
import AppBar from '../../components/ui/AppBar';
import { LoadingState } from '../../store/atoms';
import UserBlockListItem from '../../components/ui/UserBlockListItem';
import { ToastDispatchContext } from '../../components/ui/toast/ToastProvider';

export type BlockManagementScreenProps = StackScreenProps<
  RootStackParamList,
  'BlockManagement'
>;

type BlockStatus = 'block' | 'unblock';

interface BlockListItem {
  id: string;
  nickname: string;
  blockStatus: BlockStatus;
  profileImage?: string;
}

const BlockManagement = ({ navigation, route }: BlockManagementScreenProps) => {
  const [blockList, setBlockList] = useState<BlockListItem[]>([]);
  const setIsLoading = useSetRecoilState(LoadingState);
  const toastDispatch = useContext(ToastDispatchContext);

  const onToggleBlockStatus = async (id: string) => {
    setIsLoading(true);

    try {
      const clone = [...blockList];

      const findIndex = clone.findIndex((b) => b.id === id);
      const target = clone[findIndex];

      const result = await axios.patch<{ blockStatus: BlockStatus }>(
        `/user/${target.blockStatus === 'block' ? 'unblock' : 'block'}`,
        {
          blockedBy: target.id,
        }
      );

      if (target.blockStatus === 'block') {
        toastDispatch?.showToastMessage('차단 해제되었어요.');
      }

      clone[findIndex].blockStatus = result.data.blockStatus;

      setBlockList(clone);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<{ blockList: BlockListItem[] }>(
          '/user/blocked'
        );
        setBlockList(data.blockList);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <AppBar title="차단관리" />
      <FlatList
        style={{
          height: '100%',
        }}
        ListEmptyComponent={
          <EmptyList description="차단한 사용자가 없습니다." />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        data={[...blockList]}
        renderItem={({ item }) => (
          <UserBlockListItem
            isBlocked={item.blockStatus === 'block'}
            nickname={item.nickname}
            profileImage={item.profileImage}
            onToggleHandler={() => {
              onToggleBlockStatus(item.id);
            }}
          />
        )}
      />
    </>
  );
};

export default BlockManagement;
