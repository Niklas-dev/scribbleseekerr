"use client";
import LottiePlayer from "@/components/LottiePlayer";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [initialRegister, setInitialRegister] = useState(false);

  const error = (message: string) => toast.error(message);

  const handleSuccess = (response: any) => {
    localStorage.setItem("access_token", response["access_token"]);
    localStorage.setItem("refresh_token", response["refresh_token"]);

    router.push("/texts");
  };

  const handleError = (response: any) => {
    console.error(response);
    let message = "";

    if ("password" in response) {
      message = response["password"];
    } else if ("username" in response) {
      message = response["username"];
    } else if ("email" in response) {
      message = response["email"];
    }
    setInitialRegister(false);
    error(`${message}`);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      setInitialRegister(true);
      console.log(tokenResponse);
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

  const register = async () => {
    const isValid = (): boolean => {
      if (
        loginData.username === "" ||
        loginData.email === "" ||
        loginData.password === ""
      ) {
        return false;
      }
      return true;
    };

    if (isValid()) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/users/register`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(loginData),
        }
      ).then(async (response) => {
        if (response.status === 201) {
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
    <div className="w-screen h-screen min-h-[700px]  bg-[#0e0e0e] flex flex-row justify-center gap-0 overflow-x-hidden">
      <ToastContainer
        theme="dark"
        position="top-center"
        closeButton
        autoClose={2000}
        limit={5}
      />
      {initialRegister ? (
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
          <div className="h-full   md:w-1/2 p-4  sm:p-12 md:p-24 md:min-w-[700px] flex flex-col justify-around md:justify-start">
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
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pt-4 lg:pt-8 pb-1`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={(e) => {
                    let newData = loginData;

                    newData.email = e.target.value;

                    setLoginData(loginData);
                  }}
                  className="h-12 md:h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100"
                  id="email"
                  type="text"
                />

                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pt-4 lg:pt-8 pb-1`}
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
              </div>
              <div className="pt-12 flex flex-col items-center justify-center gap-8">
                <button
                  onClick={register}
                  className={`${PoppinsSemi.className} bg-gradient-to-l from-white via-gray-200 to-gray-500 h-12 w-full rounded-lg transition-transform duration-300 hover:scale-95`}
                >
                  Register
                </button>

                <button
                  onClick={() => loginWithGoogle()}
                  className={`${PoppinsSemi.className} bg-transparent border-gray-700 border-2 h-12 w-full rounded-lg text-gray-100 transition-transform duration-300 hover:scale-95 flex flex-row justify-center gap-4 items-center`}
                >
                  <FaGoogle size={20} />
                  Register with Google
                </button>
              </div>
              <div className="flex flex-row justify-center pt-4">
                <Link
                  href={"/login"}
                  className={`${PoppinsRegular.className} text-gray-500`}
                >
                  Already got an account?{" "}
                  <span className="text-gray-100">sign in now</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-full  w-1/2 flex-row  justify-start items-end  p-8 hidden lg:flex">
            <LottiePlayer
              src="https://assets2.lottiefiles.com/packages/lf20_yswp4uj3.json"
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
