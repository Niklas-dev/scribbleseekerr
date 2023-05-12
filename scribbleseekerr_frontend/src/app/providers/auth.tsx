import { defaultConfig } from "next/dist/server/config-shared";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

export interface IAuthContext {
  user: IUser;
}

export interface IUser {
  username: string;
  about: string;
  email: string;
  postsNum: number;
}
const authContextDefaultValues: IUser = {
  username: "",
  about: "",
  email: "",
  postsNum: 0,
};

const AuthContext = createContext<IUser>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: ReactNode;
}

export const getUserData = async (): Promise<IUser> => {
  let data = authContextDefaultValues;
  data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/users/user_data`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  console.log(data);
  return {
    username: data["username"],
    email: data["email"],
    about: data["about"],
    postsNum: 0,
  };
};

export const deleteUserData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  return {
    username: "",
    about: "",
    email: "",
    postsNum: 0,
  };
};

export const AuthProvider = AuthContext.Provider;
