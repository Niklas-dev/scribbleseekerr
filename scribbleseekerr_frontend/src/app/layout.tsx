"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider, IUser, getUserData, useAuth } from "./providers/auth";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ScribbleSeekerr",
  description:
    "Unleash your creativity and join our community of wordsmiths! Share your stories and poems, or dive into a world of imagination with our endless collection of literary treasures. Welcome to a place where every word matters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>({
    username: "",
    about: "",
    email: "",
    postsNum: 0,
  });
  const [loading, setLoading] = useState(true);
  const setupAuth = async (): Promise<void> => {
    let userData: IUser = await getUserData();

    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    setupAuth();
    console.log("fetched");
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider value={user}>
          {!loading && (
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
            >
              {children}
            </GoogleOAuthProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
