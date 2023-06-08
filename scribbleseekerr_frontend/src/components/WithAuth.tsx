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
      // Check if the user is authenticated, e.g., by checking for a token in local storage or making an API call.
      // Replace this with your own authentication logic.

      // If the user is not authenticated, redirect to the login page.
    }, [loaded]);

    // Render the protected component if the user is authenticated.
    // Otherwise, you can display a loading spinner or any other message.
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
}
