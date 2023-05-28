"use client";
import InitialsAvatar from "@/components/InitialsAvatar";
import { useAuth } from "@/providers/auth";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Page() {
  const { user, loaded, loginWithToken } = useAuth();
  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-center"
        closeButton
        autoClose={2000}
        limit={3}
      />

      <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
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
            ScribbleSeekerr
          </Link>

          <div></div>
        </div>
        <div className="pt-20 pb-36 flex flex-row justify-center">
          <div className="bg-[#161616] flex flex-col p-6 rounded-lg max-w-[600px] w-full">
            <div className="w-full flex flex-row justify-center">
              {user ? (
                <div className="h-[65px] w-[65px] min-h-[65px] min-w-[65px] md:h-[100px] md:w-[100px] rounded-full bg-gradient-to-br from-violet-500 to-blue-900 text-white grid place-content-center">
                  {user.username.slice(0, 4)}
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="flex flex-col pt-8">
              <label
                className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                htmlFor="username"
              >
                Username
              </label>
              <input
                value={user?.username}
                id="username"
                className={`${PoppinsSemi.className} h-12 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 `}
                type="text"
              ></input>
            </div>

            <div className="w-full pt-8">
              <button
                onClick={() => {}}
                className={`${PoppinsSemi.className} w-full text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 grid items-center h-12 transition-transform duration-300 hover:scale-95`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
