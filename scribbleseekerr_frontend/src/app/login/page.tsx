"use client";
import LottiePlayer from "@/components/LottiePlayer";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [initalLogin, setInitalLogin] = useState(false);

  const error = (message: string) => toast.error(message);

  const handleSuccess = (response: any) => {
    localStorage.setItem("access_token", response["access_token"]);
    localStorage.setItem("refresh_token", response["refresh_token"]);

    router.push("/texts");
  };

  const handleError = (response: any) => {
    let message = "";

    if ("password" in response) {
      message = response["password"];
    } else if ("username" in response) {
      message = response["username"];
    }
    setInitalLogin(false);
    error(`${message}`);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      setInitalLogin(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/auth/convert-token`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            token: tokenResponse["access_token"],
            grant_type: "convert_token",
            backend: "google-oauth2",
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
          }),
        }
      ).then(async (response) => {
        if (response.status === 200) {
          handleSuccess(await response.json());
        } else {
          handleError(await response.json());
        }
      });
    },
  });

  const login = async () => {
    const isValid = (): boolean => {
      if (loginData.username === "" || loginData.password === "") {
        return false;
      }
      return true;
    };

    if (isValid()) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/auth/token`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: loginData.username,
            password: loginData.password,
            grant_type: "password",
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
          }),
        }
      ).then(async (response) => {
        if (response.status === 200) {
          handleSuccess(await response.json());
        } else {
          handleError(await response.json());
        }
      });
    } else {
      error("Fill out all fields!");
    }
  };
  return (
    <div className="w-screen h-screen min-h-[700px] bg-[#0e0e0e] flex flex-row justify-center gap-0 overflow-x-hidden">
      <ToastContainer
        theme="dark"
        position="top-center"
        closeButton
        autoClose={2000}
        limit={5}
      />
      {initalLogin ? (
        <div className="w-full h-full grid items-center">
          <LottiePlayer
            src="https://assets5.lottiefiles.com/packages/lf20_xjtnusnv.json"
            classes="xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] w-[300px] h-[300px]  mt-8"
            autoplay
            loop
          />
        </div>
      ) : (
        <>
          <div className="h-full   md:w-1/2 p-4  sm:p-12 md:p-24 md:min-w-[700px] flex flex-col justify-around md:justify-start ">
            <Link
              href="/"
              className={`${PoppinsBold.className} text-gray-100 textl-xl md:text-2xl`}
            >
              ScribbleSeekerr
            </Link>
            <div className="py-14 md:px-20 ">
              <h2
                className={`${PoppinsLight.className} text-gray-100 text-2xl md:text-3xl`}
              >
                Welcome back, to your <b>world</b>!
              </h2>
              <p
                className={`${PoppinsLight.className} text-gray-400 text-base`}
              >
                Please enter you details
              </p>

              <div className=" md:pt-12 lg:pt-14 flex flex-col  ">
                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  onChange={(e) => {
                    let newData = loginData;

                    newData.username = e.target.value;

                    setLoginData(loginData);
                  }}
                  className="h-12 md:h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100"
                  id="username"
                  type="text"
                />

                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pt-8 pb-1`}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    let newData = loginData;

                    newData.password = e.target.value;

                    setLoginData(loginData);
                  }}
                  className="h-12 md:h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100 "
                  id="password"
                  type={showPassword ? "text" : "password"}
                />
              </div>
              <div className="flex flex-row justify-between pt-6">
                <div className="flex flex-row gap-1 md:gap-2">
                  <input
                    onChange={(e) => setShowPassword(e.target.checked)}
                    defaultChecked={showPassword}
                    className="scale-125 checked:accent-green-600 ml-1"
                    type="checkbox"
                  />
                  <p className={`${PoppinsRegular.className} text-gray-100`}>
                    Show password
                  </p>
                </div>
                {/*
                <button
                  className={`${PoppinsRegular.className} text-gray-100 underline underline-offset-2`}
                >
                  Forgot password
                </button>

                  */}
              </div>
              <div className="pt-12 flex flex-col items-center justify-center gap-8">
                <button
                  onClick={login}
                  className={`${PoppinsSemi.className} bg-gradient-to-l from-white via-gray-200 to-gray-500 h-12 w-full rounded-lg transition-transform duration-300 hover:scale-95`}
                >
                  Login
                </button>

                <button
                  onClick={() => loginWithGoogle()}
                  className={`${PoppinsSemi.className} bg-transparent border-gray-700 border-2 h-12 w-full rounded-lg text-gray-100 transition-transform duration-300 hover:scale-95 flex flex-row justify-center gap-4 items-center`}
                >
                  <FaGoogle size={20} />
                  Login with Google
                </button>
              </div>
              <div className="flex flex-row justify-center pt-4">
                <Link
                  href={"/register"}
                  className={`${PoppinsRegular.className} text-gray-500`}
                >
                  Don&apos;t have an account?{" "}
                  <span className="text-gray-100">sign up now</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-full  w-1/2 flex-row  justify-start items-end  p-8 hidden lg:flex">
            <LottiePlayer
              src="https://assets2.lottiefiles.com/packages/lf20_jt1ky9pg.json"
              classes="xl:w-[800px] xl:h-[800px] lg:w-[400px] lg:h-[400px]  mt-8"
              autoplay
              loop
            />
          </div>
        </>
      )}
    </div>
  );
}
