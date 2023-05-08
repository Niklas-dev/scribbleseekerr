import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-screen h-screen min-h-[700px]  bg-[#0e0e0e] flex flex-row justify-center gap-0 overflow-x-hidden">
      <div className="h-full   md:w-1/2 p-4  sm:p-12 md:p-18 md:min-w-[700px] flex flex-col justify-around md:justify-start">
        <h3
          className={`${PoppinsBold.className} text-gray-100 textl-xl md:text-2xl`}
        >
          ScribbleSeekerr
        </h3>
        <div className="py-10 md:px-20 ">
          <h2
            className={`${PoppinsLight.className} text-gray-100 text-2xl md:text-3xl`}
          >
            Welcome to your <b>world</b>!
          </h2>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            Please enter you details
          </p>

          <div className=" md:pt-6 lg:pt-8 flex flex-col  ">
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="h-12 md:h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100"
              id="username"
              type="text"
            />
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pt-4 pb-1`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="h-12 md:h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100"
              id="email"
              type="text"
            />

            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pt-4 pb-1`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="h-12 md:h-14 bg-[#1d1d1d] rounded-lg outline-none py-2 px-4 text-gray-100 "
              id="password"
              type="password"
            />
          </div>
          <div className="flex flex-row justify-between pt-6">
            <div className="flex flex-row md:gap-2">
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
          <div className="pt-12 flex flex-col items-center justify-center gap-4">
            <button
              className={`${PoppinsSemi.className} bg-gradient-to-l from-white via-gray-200 to-gray-500 h-12 w-full rounded-lg`}
            >
              Register
            </button>

            <button
              className={`${PoppinsSemi.className} bg-transparent border-gray-700 border-2 h-12 w-full rounded-lg text-gray-100`}
            >
              Sign up with Google
            </button>
          </div>
          <div className="flex flex-row justify-center pt-4">
            <Link
              href={"/login"}
              className={`${PoppinsRegular.className} text-gray-500`}
            >
              Already have an account?{" "}
              <span className="text-gray-100">sign in now</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-screen  w-1/2  p-8 hidden lg:block">
        <Image
          priority
          src={"/images/auth-bg.jpg"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-fit"
        />
      </div>
    </div>
  );
}
