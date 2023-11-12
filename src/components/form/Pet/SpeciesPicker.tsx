import React from 'react';
import InputField from '../../ui/inputs/InputField';
import Selectable from '../../ui/Selectable';
import useOverlay from '../../../hooks/overlay/useOverlay';
import { PetType } from '../../../types/interface';
import BottomSheet from '../../ui/BottomSheet';
import { Pressable, View, Text } from 'react-native';
import TYPOS from '../../ui/typo';
import Color from '../../../constants/color';
import useDidUpdate from '../../../hooks/useDidUpdate';

interface Props {
  value: string;
  onChangeHandler: (value: string) => void;
  type: '직접 입력' | '목록에서 선택';
  petType: PetType;
}

const CAT_LIST = [
  '믹스묘',
  '코리안 숏헤어',
  '러시안 블루',
  '페르시안',
  '샴 고양이',
  '터키쉬 앙고라',
  '뱅갈고양이',
  '아비니시안',
  '스코티쉬폴드',
  '브리티시 숏헤어',
];
const DOG_LIST = [
  '믹스견',
  '말티즈',
  '푸들',
  '포메라니안',
  '진돗개',
  '시츄',
  '비숑 프리제',
  '웰시코기',
  '리트리버',
  '치와와',
];

const SpeciesPicker = ({ value, onChangeHandler, type, petType }: Props) => {
  const overlay = useOverlay();
  const list = petType === 'dog' ? DOG_LIST : CAT_LIST;
  const defaultHeader = 80 + list.length * 56 + 40;

  useDidUpdate(() => {
    onChangeHandler('');
  }, [type]);

  const inputForm = () => {
    return (
      <InputField
        placeholder={`${petType === 'cat' ? '묘종' : '견종'}을 선택하세요.`}
        value={value}
        onChangeHandler={(text) => {
          onChangeHandler(text);
        }}
      />
    );
  };

  const openListBottomSheet = () => {
    overlay.open(
      <BottomSheet
        isOpened={true}
        onClose={() => {
          overlay.close();
        }}
        height={defaultHeader}
        title={`${petType === 'cat' ? '묘종' : '견종'} 선택`}
      >
        <View
          style={{
            paddingHorizontal: 24,
            width: '100%',
            height: '100%',
          }}
        >
          {list.map((text) => (
            <Pressable
              style={{ paddingVertical: 16 }}
              key={text}
              onPress={() => {
                onChangeHandler(text);
                overlay.close();
              }}
            >
              <Text
                style={[
                  TYPOS.body1,
                  { color: value === text ? Color.primary700 : Color.black },
                ]}
              >
                {text}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheet>
    );
  };

  const selectForm = () => {
    return (
      <Selectable
        value={value}
        onPressHandler={openListBottomSheet}
        placeholder={`${petType === 'cat' ? '묘종' : '견종'}을 선택하세요.`}
      />
    );
  };

  return <>{type === '목록에서 선택' ? selectForm() : inputForm()}</>;
};

export default SpeciesPicker;
