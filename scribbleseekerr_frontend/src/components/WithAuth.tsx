import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAuth(WrappedComponent: any) {
  const ComponentWithAuth = (props: any) => {
    const { user, loaded, loginWithToken } = useAuth();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      async function getAuth() {
        let auth = await loginWithToken();
        if (!auth) {
          router.push("/login");
        }
        setIsAuthenticated(auth);
      }

      getAuth();
    }, [loaded]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
}
