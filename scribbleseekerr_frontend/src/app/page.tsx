"use client";

import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useState } from "react";
import GoogleButton from "react-google-button";
import Image from "next/image";
import LottiePlayer from "@/components/LottiePlayer";
import LandingNav from "@/components/LandingNav";
import MainContent from "@/components/MainContent";
import AboutFeatures from "@/components/AboutFeatures";
import TextSamples from "@/components/TextSamples";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      loginGoogle(tokenResponse.access_token);
    },
  });

  const login = () => {
    fetch("http://127.0.0.1:8000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: userName,
        password: password,
        grant_type: "password",
        client_id: "7p1Mb54OHl4baJ5KfTAUEp4atqKiInvn8lkRLYSo",
        client_secret:
          "0uNhvxXietC3P7SbfylnVkwGqLh00Sg0Uo57R0xHAC5NB9jeID3STCbOisT5mVsgFUrUeFq90aOgjut9xLUhxfTYPqvPstxT0bIhDlniyZc8X7IFNorBTrmZIIx28UZi",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => {
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("access_token", data["access_token"]);
        console.table(data);
      });
  };

  const loginGoogle = (key: string) => {
    fetch("http://127.0.0.1:8000/auth/convert-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: key,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "7p1Mb54OHl4baJ5KfTAUEp4atqKiInvn8lkRLYSo",
        client_secret:
          "0uNhvxXietC3P7SbfylnVkwGqLh00Sg0Uo57R0xHAC5NB9jeID3STCbOisT5mVsgFUrUeFq90aOgjut9xLUhxfTYPqvPstxT0bIhDlniyZc8X7IFNorBTrmZIIx28UZi",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => {
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("access_token", data["access_token"]);
        console.table(data);
      });
  };

  const fetchTest = () => {
    fetch("http://127.0.0.1:8000/users/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => {
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("access_token", data["access_token"]);
        console.table(data);
      });
  };

  const responseMessage = (response: any) => {
    console.log(response);

    loginGoogle(response.credential);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return (
    <main className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full">
      <LandingNav />
      <div className="text-gray-100  h-96 flex flex-col items-center  mt-32 xl:mt-48">
        <MainContent />
        <AboutFeatures />
        <TextSamples />
      </div>
    </main>
  );
}
