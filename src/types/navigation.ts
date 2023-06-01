import { Location } from './interface';
import * as MediaLibrary from 'expo-media-library';

export type RootStackParamList = {
  Onboarding: undefined;
  AddressRegistration: { email?: string };
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
  };
  Camera: {
    callback: () => void;
  };
};

export type TabNavigatorParamList = {
  Home: undefined;
  MyPet: undefined;
  PetMate: undefined;
  PetVillage: undefined;
};
