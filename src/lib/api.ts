import axios, { AxiosError } from 'axios';

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
