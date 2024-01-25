import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../store/atoms';
import PetMate, {
  SubmitData,
  Data,
  WalkDate,
} from '../components/form/PetMate';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export type AddPetMateScreenProps = StackScreenProps<
  RootStackParamList,
  'ModifyPetMate'
>;

export interface ResponseData extends Omit<Data, 'walkDate'> {
  date: Date;
}

const ModifyPetMate = ({ navigation, route }: AddPetMateScreenProps) => {
  const [initData, setInitData] = useState<null | Data>(null);
  const id = route.params.id;

  const setIsLoading = useSetRecoilState(LoadingState);

  const generatedWalkDate = (date: Date) => {
    const [day, time] = dayjs(date).format('YYYYMMDD hh:mm').split(' ');
    const [hour, minute] = time.split(':');

    const obj: WalkDate = {
      date: day,
      time: {
        ampm: Number(hour) > 12 ? 'PM' : 'AM',
        hour,
        minute,
      },
    };

    return obj;
  };

  useEffect(() => {
    const getInitData = async () => {
      const {
        data: { editPetMateBoardInfo },
      } = await axios.get<{ editPetMateBoardInfo: ResponseData }>(
        `/board/pet-mate/edit/${id}`
      );

      const walkDate = generatedWalkDate(editPetMateBoardInfo.date);
      const clone: Data = { ...editPetMateBoardInfo, walkDate };
      setInitData(clone);
    };

    if (id) {
      getInitData();
    }
  }, [id]);

  const onSubmit = async (data: SubmitData) => {
    setIsLoading(true);

    console.log(data);
    try {
      await axios.put(`/board/pet-mate/${id}`, {
        ...data,
      });
      navigation.pop();
    } finally {
      setIsLoading(false);
    }
  };

  if (!initData) {
    return null;
  }

  return <PetMate onSubmitHandler={onSubmit} initData={initData} />;
};

export default ModifyPetMate;
