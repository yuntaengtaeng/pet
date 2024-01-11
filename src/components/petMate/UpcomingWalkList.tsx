import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { ViewStyle } from 'react-native';
import { View, Text } from 'react-native';
import { useSetRecoilState } from 'recoil';
import Color from '../../constants/color';
import { LoadingState } from '../../store/atoms';
import { MyMatePost } from '../../types/interface';
import TextIconButton from '../ui/buttons/TextIconButton';
import MateCard from '../ui/MateCard';
import TYPOS from '../ui/typo';

interface Props {
  containerStyle?: ViewStyle;
  hasMoreButton?: boolean;
  onMoreButtonPressHandler?: () => void;
}

const LIMIT = 2;

const UpcomingWalkList = ({
  containerStyle,
  hasMoreButton = false,
  onMoreButtonPressHandler,
}: Props) => {
  const [list, setList] = useState<MyMatePost[]>([]);
  const setIsLoading = useSetRecoilState(LoadingState);

  const renderedList = useMemo(() => {
    if (hasMoreButton) {
      return [...list].slice(0, LIMIT);
    } else {
      return [...list];
    }
  }, [list, hasMoreButton]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get<{ scheduledWalkInfo: MyMatePost[] }>(
          '/board/pet-mate/walking-schedules'
        );

        setList(result.data.scheduledWalkInfo);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <View
      style={{
        gap: 16,
        ...containerStyle,
      }}
    >
      <Text style={[TYPOS.headline4, { color: Color.neutral1 }]}>
        시작 예정 산책
      </Text>
      {renderedList.map((v) => (
        <MateCard
          key={v.id}
          gap={16}
          title={`${v.address} · ${v.date}`}
          description={v.title}
          descriptionSize={2}
        />
      ))}
      {hasMoreButton && list.length > LIMIT && (
        <View style={{ alignItems: 'center' }}>
          <TextIconButton
            label="더보기"
            onPressHandler={onMoreButtonPressHandler}
          />
        </View>
      )}
    </View>
  );
};

export default UpcomingWalkList;
