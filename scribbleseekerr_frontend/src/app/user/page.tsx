"use client";
import { useAuth } from "@/providers/auth";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { user } = useAuth();
  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
      <div className="flex flex-row items-center justify-between  pt-8 gap-8">
        <Link
          href={"/texts"}
          className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          Profile
        </Link>

        <div></div>
      </div>
      <div className="pt-10 flex flex-row justify-center w-full ">
        <div className="bg-[#161616] w-3/5 h-fit py-8 px-20 rounded-lg ">
          <p
            className={`${PoppinsSemi.className} text-center text-gray-200 text-2xl`}
          >
            @{user?.username}
          </p>
          <div className="flex flex-row justify-center gap-12 mt-4">
            <div className="min-h-[100px] min-w-[100px] rounded-full bg-gradient-to-br from-violet-500 to-blue-900 text-white grid place-content-center">
              Diez
            </div>
            <div className="flex flex-row gap-10 ">
              <div className="flex flex-col justify-center items-center">
                <p className={`${PoppinsBold.className} text-gray-200 text-xl`}>
                  6
                </p>
                <h3
                  className={`${PoppinsRegular.className} text-gray-200 text-xl`}
                >
                  Beiträge
                </h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className={`${PoppinsBold.className} text-gray-200 text-xl`}>
                  69
                </p>
                <h3
                  className={`${PoppinsRegular.className} text-gray-200 text-xl`}
                >
                  Flamen
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p
              className={`${PoppinsRegular.className} text-gray-200 text-lg text-center bg-[#222222] w-full p-2 mt-6 rounded-md`}
            >
              Hey I am a story writer and i like chat gpt!
            </p>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <Link
              className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95  w-full text-center`}
              href={!user ? "/login" : "/texts"}
            >
              Edit
            </Link>
          </div>
          <div>
            <div className="flex flex-row justify-center mt-8">
              <h2 className={`${PoppinsSemi.className} text-gray-200 text-xl`}>
                Your Posts
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
