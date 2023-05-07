import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="w-screen h-screen bg-[#0e0e0e] flex flex-row justify-center gap-0">
      <div className="h-full w-1/2  p-24">
        <h3 className={`${PoppinsBold.className} text-gray-100 text-2xl`}>
          ScribbleSeekerr
        </h3>
        <div className="py-16 px-20 ">
          <h2 className={`${PoppinsLight.className} text-gray-100 text-3xl`}>
            Welcome back, to your <b>world</b>!
          </h2>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            Please enter you details
          </p>

          <div className="pt-20 flex flex-col  ">
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-xl pt-8 pb-1`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100"
              id="email"
              type="text"
            />

            <label
              className={`${PoppinsRegular.className} text-gray-100 text-xl pt-8 pb-1`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100 "
              id="password"
              type="password"
            />
          </div>
          <div className="flex flex-row justify-between pt-6">
            <div className="flex flex-row gap-2">
              <input
                className="scale-125 checked:accent-green-600 ml-1"
                type="checkbox"
              />
              <p className={`${PoppinsRegular.className} text-gray-100`}>
                Show password
              </p>
            </div>
            <button
              className={`${PoppinsRegular.className} text-gray-100 underline underline-offset-2`}
            >
              Forgot password
            </button>
          </div>
          <div className="pt-12 flex flex-col items-center justify-center gap-8">
            <button
              className={`${PoppinsSemi.className} bg-gradient-to-l from-white via-gray-200 to-gray-500 h-12 w-full rounded-lg`}
            >
              Login
            </button>

            <button
              className={`${PoppinsSemi.className} bg-transparent border-gray-700 border-2 h-12 w-full rounded-lg text-gray-100`}
            >
              Login with Google
            </button>
          </div>
          <div className="flex flex-row justify-center pt-4">
            <button className={`${PoppinsRegular.className} text-gray-500`}>
              Don&apos;t have an account?{" "}
              <span className="text-gray-100">sign up now</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2  p-8">
        <Image
          src={"/login-bg.jpg"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
