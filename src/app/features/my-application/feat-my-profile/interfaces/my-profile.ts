export interface MyProfile {
  statusCode: number;
  username: string;
  email: string;
  names: string;
  gender: string;
  borndate: Date;
  location: string;
  weightKg: number;
  heightCm: number;
  imc: string;
}

enum Genre {
  M,
  F,
}

export interface PutMyProfile {
  names: string;
  gender: Genre;
  borndate: string;
}