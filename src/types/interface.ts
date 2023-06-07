export interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  email: string;
  nickname: string;
  profileImage?: string;
  petType: string;
  address: string;
  accessToken: string;
  refreshToken: string;
}
