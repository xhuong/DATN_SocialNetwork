import { IUserBE } from "@/utils/common";
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const defaultUserInfo: IUserBE = {
  id: 0,
  name: "",
  address: "",
  image_profile: "",
};

export const getUserInfo = (): IUserBE => {
  const userInfo = localStorage.getItem("user_info");
  if (userInfo) {
    return JSON.parse(userInfo) as IUserBE;
  } else {
    return defaultUserInfo;
  }
};

export const logOut = () => {
  localStorage.removeItem("user_info");
  localStorage.removeItem("access_token");
};
