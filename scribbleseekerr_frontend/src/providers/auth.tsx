"use client";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export interface IAuthContext {
  user: IUser | null;
  loginWithToken: () => Promise<boolean>;
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
  loginWithToken: async () => false,
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
  const [triedRefresh, setTriedRefresh] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<IUser | null>({
    username: "",
    email: "",
    about: "",
    pk: 0,
    postsNum: 0,
  });

  const registerUser = () => {};

  const loginWithToken = async (): Promise<boolean> => {
    console.log("getUser");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/users/user-data`,
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
    } else if (response.status === 401 && !triedRefresh) {
      setTriedRefresh(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/auth/token`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            refresh_token: localStorage.getItem("refresh_token")!,

            grant_type: "refresh_token",
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
          }),
        }
      );
      if (response.status === 200) {
        const json = await response.json();
        localStorage.setItem("access_token", json["access_token"]);
        localStorage.setItem("refresh_token", json["refresh_token"]);

        loginWithToken();
        console.log("Refreshing token");
      } else {
        console.log("Failed refreshing token");
        setLoaded(true);
        setUser(null);
        return false;
      }
    } else {
      setLoaded(true);
      setUser(null);
      return false;
    }
    setLoaded(true);

    return true;
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

  useLayoutEffect(() => {
    loginWithToken();
    return () => {};
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
