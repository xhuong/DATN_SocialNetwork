export interface IUserBE {
  id: number;
  name: string;
  user_name: string;
  password: string;
  address: string;
  phone_number: string;
  image_profile: string;
  role_id: number;
}

export interface IUserResponseType
  extends Omit<IUserBE, "password" | "role_id" | "user_name"> {}

export interface IUserBEOmitId extends Omit<IUserBE, "id"> {}

export interface IUserBEContactType
  extends Omit<IUserBE, "user_name" | "password" | "phone_number"> {
  is_followed: boolean;
}
