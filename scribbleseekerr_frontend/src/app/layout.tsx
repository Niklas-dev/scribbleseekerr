"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider, IUser } from "../providers/auth";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ScribbleSeekerr",
  keywords: [
    "ScribbleSeekerr",
    "Texts",
    "Sharing",
    "Poems",
    "Stories",
    "Papers",
  ],
  description:
    "Unleash your creativity and join our community of wordsmiths! Share your stories and poems, or dive into a world of imagination with our endless collection of literary treasures. Welcome to a place where every word matters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
