import axios, { AxiosError } from 'axios';
import { Pet } from '../types/interface';

export const checkDuplicateNickname = async (nickname: string) => {
  try {
    const response = await axios.post('/auth/nickname', { nickname });
    return response.data;
  } catch (error) {
    const errorResponse = (error as AxiosError).response;

    if (errorResponse) {
      const { message } = errorResponse.data as { message: string };
      throw new Error(message);
    }

    throw error;
  }
};

export const getRegisteredDogsList = async () => {
  const result = await axios.get<{ pets: Pet[] }>('/my-page/pets');
  const dogs = result.data.pets.filter((v) => v.type === '강아지');

  return dogs;
};
