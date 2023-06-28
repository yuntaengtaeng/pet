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

export type DefaultCategory =
  | '전체'
  | '사료/간식'
  | '영양제'
  | '배변/미용'
  | '장난감'
  | '기타';

export type DogCategory = DefaultCategory | '의류/산책용품';
export type CatCategory = DefaultCategory | '캣타워/하우스';

export interface Product {
  id: string;
  title: string;
  price: string;
  timeDelta: string;
  image: string;
  address: string;
  likeCount: number;
  chatCount: number;
  salesStatus: '판매중' | '예약중';
}

export interface UserAddress {
  id: string;
  address: string;
  isLastSelected?: boolean;
}
