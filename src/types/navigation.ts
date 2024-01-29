import { ApplyPetMateScreenProps } from './../screens/ApplyPetMate';
import { Location, Pet, PetType, ProductInfo } from './interface';
import * as MediaLibrary from 'expo-media-library';

export type RootStackParamList = {
  Onboarding: undefined;
  AddressRegistration: { email: string };
  KaKaoLogin: undefined;
  FillProfile: {
    location: Location;
    address: string;
    email: string;
  };
  BottomNavigation: undefined;
  Gallery: {
    limit: number;
    callback: (medias: MediaLibrary.Asset[]) => void;
    selectedPhotoIds?: MediaLibrary.Asset[];
  };
  Camera: {
    callback: () => void;
  };
  EditProduct: undefined;
  AddressModify: undefined;
  ProductDetail: {
    id: string;
  };
  UserProductList: {
    id: string;
    name: string;
  };
  ModifyProduct: {
    id: string;
  };
  ChatRoom: {
    roomId: string;
  };
  AppointmentScheduler: {
    roomId: string;
    type: 'ADD' | 'MODIFY';
    scheduleId?: string;
  };
  AddPet: {
    type: PetType;
  };
  TradeConfirmation: ProductInfo;
  ModifyProfile: undefined;
  PetDetail: {
    petId: string;
  };
  ProductChatting: {
    id: string;
  };
  ModifyPet: {
    id: string;
  };
  AddPetMate: undefined;
  PetMateDetail: {
    id: string;
  };
  ApplyPetMate: {
    id: string;
    selectedPets: Pet[];
    limit: number;
  };
  PetMateRequestList: {
    id: string;
  };
  MyMate: undefined;
  UpcomingWalk: undefined;
  ModifyPetMate: {
    id: string;
  };
  FavoriteProducts: undefined;
  TransactionHistory: undefined;
  BlockManagement: undefined;
};

export type TabNavigatorParamList = {
  Home: undefined;
  MyPage: undefined;
  PetMate: undefined;
  Chatting: undefined;
};
