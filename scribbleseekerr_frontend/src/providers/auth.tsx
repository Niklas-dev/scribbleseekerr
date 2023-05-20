"use client";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IAuthContext {
  user: IUser | null;
  loginWithToken: () => void;
  refreshJWTToken: () => void;
  logoutUser: () => void;
  loaded: boolean;
}

export interface IUser {
  username: string;
  about: string;
  email: string;
  pk: number;
  postsNum: number;
}
const authContextDefaultValues: IAuthContext = {
  user: {
    username: "",
    about: "",
    email: "",
    pk: 0,
    postsNum: 0,
  },
  loginWithToken: () => {},
  refreshJWTToken: () => {},
  logoutUser: () => {},
  loaded: false,
};

const AuthContext = createContext<IAuthContext>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<IUser | null>({
    username: "",
    email: "",
    about: "",
    pk: 0,
    postsNum: 0,
  });

  const registerUser = () => {};

  const loginWithToken = async () => {
    console.log("getUser");
    const response = await fetch(
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
    );
    let data = await response.json();

    if (response.status === 200) {
      setUser({
        username: data["username"],
        email: data["email"],
        about: data["about"],
        pk: data["pk"],
        postsNum: 0,
      });
    } else {
      setUser(null);
    }
    setLoaded(true);
  };

  const refreshJWTToken = async () => {};

  const logoutUser = () => {
    setUser({
      username: "",
      about: "",
      email: "",
      pk: 0,
      postsNum: 0,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const value = {
    user,
    loginWithToken,
    logoutUser,
    refreshJWTToken,
    loaded,
  };

  useEffect(() => {
    loginWithToken();
    return () => {};
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
