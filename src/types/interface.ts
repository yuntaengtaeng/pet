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

export type ProductStatus = '판매중' | '예약중' | '판매완료';

export interface Product {
  id: string;
  title: string;
  price: string;
  timeDelta: string;
  image: string;
  address: string;
  likeCount: number;
  chatCount: number;
  salesStatus: ProductStatus;
}

export interface UserAddress {
  id: string;
  address: string;
  isLastSelected?: boolean;
}

export interface ProductDetail {
  sellerNickname: string;
  title: string;
  address: string;
  price: number;
  subCategory: string;
  timeDelta: string;
  description: string;
  likeCount: number;
  chatCount: number;
  viewCount: number;
  salesStatus: ProductStatus;
  images: string[];
  sellerProfileImage?: string;
  isLike: boolean;
  isMe?: boolean;
}
