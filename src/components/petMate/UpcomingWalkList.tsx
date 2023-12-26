import { useEffect, useMemo, useState } from 'react';
import { ViewStyle } from 'react-native';
import { View, Text } from 'react-native';
import Color from '../../constants/color';
import TextIconButton from '../ui/buttons/TextIconButton';
import MateCard from '../ui/MateCard';
import TYPOS from '../ui/typo';

interface Props {
  containerStyle?: ViewStyle;
  hasMoreButton?: boolean;
  onMoreButtonPressHandler?: () => void;
}

const LIMIT = 2;

const promise = (): Promise<number[]> => {
  return new Promise((r) => {
    r([...new Array(10).fill(1)]);
  });
};

const UpcomingWalkList = ({
  containerStyle,
  hasMoreButton = false,
  onMoreButtonPressHandler,
}: Props) => {
  const [list, setList] = useState<any[]>([]);

  const renderedList = useMemo(() => {
    if (hasMoreButton) {
      return [...list].slice(0, 2);
    } else {
      return [...list];
    }
  }, [list, hasMoreButton]);

  useEffect(() => {
    const fetch = async () => {
      const result = await promise();
      setList(result);
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
          gap={16}
          title={'공릉동 · 10/21(토), 오후 10시'}
          description={'과기대에서 중형견 산책 하실 분~'}
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
