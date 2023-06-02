"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider, IUser } from "../providers/auth";
import { useEffect, useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

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
