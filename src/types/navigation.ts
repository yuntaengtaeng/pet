import { Location } from './interface';
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
};

export type TabNavigatorParamList = {
  Home: undefined;
  MyPet: undefined;
  PetMate: undefined;
  Chatting: undefined;
};
