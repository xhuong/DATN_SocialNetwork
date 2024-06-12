// src/utils/auth.js
import { IUserInfoBE } from "@/services/AuthenticationAPI";
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

const defaultUserInfo: IUserInfoBE = {
  id: 0,
  address: "",
  name: "",
  role_id: 0,
  user_name: "",
};

export const getUserInfo = (): IUserInfoBE => {
  const userInfo = localStorage.getItem("user_info");
  if (userInfo) {
    return JSON.parse(userInfo) as IUserInfoBE;
  } else {
    return defaultUserInfo;
  }
};
