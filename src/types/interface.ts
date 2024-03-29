import { ViewStyle } from 'react-native';
import Color from '../constants/color';
import * as MediaLibrary from 'expo-media-library';

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

export type ProductStatus = '판매중' | '예약중' | '거래완료';

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

export interface ProductModifyData {
  id: string;
  topCategory: '전체' | '강아지' | '고양이';
  subCategory: string;
  title: string;
  images: string[];
  description: string;
  price: number;
}

export interface EtcProduct {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface ProductInfo {
  id: string;
  title: string;
  price: string;
  status: '판매중' | '예약중' | '판매완료' | '삭제됨';
  image?: string;
}

export interface IconProp {
  color: Color;
  style?: ViewStyle;
}

export interface Date {
  yyyy: string;
  m: string;
  d: string;
}

export type RoomType = 'usedTrade' | 'petMate';

export interface Room {
  id: string;
  title: string;
  lastChat: string;
  lastChatAt: string;
  isAlarm: boolean;
  isPinned: boolean;
  isPetMate?: boolean;
  image?: string;
  region: string;
  productImage?: string;
  type: RoomType;
}

export type BlockStatus = 'Me' | 'Other' | 'None';

export interface SaveImageType {
  uri: string;
  id: string;
}

export type ImageType = SaveImageType | MediaLibrary.Asset;

export interface Pet {
  id: string;
  name: string;
  type: '강아지' | '고양이';
  image?: string;
}

export type PetMateStatus = '모집중' | '모집마감';

export interface MyMatePost {
  id: string;
  address: string;
  date: string;
  title: string;
}
