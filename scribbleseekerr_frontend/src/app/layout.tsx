"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../providers/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>ScribbleSeekerr</title>
        <meta
          name="keywords"
          content="ScribbleSeekerr, Texts, Sharing, Poems, Stories, Papers"
        />
        <meta
          name="description"
          content="Unleash your creativity and join our community of wordsmiths! Share your stories and poems, or dive into a world of imagination with our endless collection of literary treasures. Welcome to a place where every word matters."
        />
      </head>
      <body className={`${inter.className} bg-[#0e0e0e]`}>
        <AuthProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            {children}
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
