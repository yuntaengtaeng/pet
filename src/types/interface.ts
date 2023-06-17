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

export type DefaultCategory = '전체' | '사료&간식' | '장난감' | '기타';

export type DogCategory = DefaultCategory | '옷' | '영양제' | '목욕&미용';
export type CatCategory = DefaultCategory | '캣타워' | '캣닢' | '배변용품';
