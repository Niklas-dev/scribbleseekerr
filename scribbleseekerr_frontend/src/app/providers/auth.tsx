import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

export interface IAuthContext {
  user: IUser;
  getUser: () => void;
  logoutUser: () => void;
}

export interface IUser {
  username: string;
  email: string;
  postsNum: number;
}
const authContextDefaultValues: IAuthContext = {
  user: {
    username: "",
    email: "",
    postsNum: 0,
  },
  getUser: () => {},
  logoutUser: () => {},
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
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    postsNum: 0,
  });

  const getUser = () => {
    setUser({
      username: "",
      email: "",
      postsNum: 0,
    });
  };

  const logoutUser = () => {
    setUser({
      username: "",
      email: "",
      postsNum: 0,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    router.push("/");
  };

  const value = {
    user,
    getUser,
    logoutUser,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
