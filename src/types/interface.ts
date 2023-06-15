export interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  email: string;
  nickname: string;
  profileImage?: string;
  petType: PetType;
  address: string;
  accessToken: string;
  refreshToken: string;
}

export type PetType = 'dog' | 'cat';
