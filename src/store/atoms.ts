import { atom } from 'recoil';
import { User } from '../types/interface';
export const LoadingState = atom({
  key: 'LoadingState',
  default: false,
});

export const UserState = atom<User>({
  key: 'UserState',
  default: {
    email: '',
    nickname: '',
    profileImage: '',
    petType: 'dog',
    address: '',
    accessToken: '',
    refreshToken: '',
  },
});
