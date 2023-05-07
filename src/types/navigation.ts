import { Location } from './interface';

export type RootStackParamList = {
  Onboarding: undefined;
  AddressRegistration: undefined;
  KaKaoLogin: undefined;
  FillProfile: {
    location: Location;
    address: string;
  };
};
