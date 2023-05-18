"use client";
import InitialsAvatar from "@/components/InitialsAvatar";
import ScrollToTop from "@/components/ScrollToTop";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../providers/auth";
import TextareaAutosize from "react-textarea-autosize";

export default function Page() {
  const { user, loaded, loginWithToken } = useAuth();

  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
      <div className="flex flex-row items-center justify-between  pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 grid items-center h-12 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        {user ? (
          <InitialsAvatar href="/user" username={user.username} />
        ) : (
          <div></div>
        )}
      </div>
      <div className=" pt-32 pb-10">
        <div className="bg-[#161616] flex flex-col p-6 rounded-lg">
          <div className="w-full flex flex-row justify-center">
            <h3
              className={`${PoppinsBold.className} text-gray-100 text-lg lg:text-2xl `}
            >
              New Post
            </h3>
          </div>
          <div className="flex flex-col pt-8">
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
              htmlFor="title"
            >
              Post title
            </label>
            <input
              id="title"
              className={`${PoppinsSemi.className} h-12 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4`}
              type="text"
            ></input>
          </div>
          <div className="flex flex-col pt-8">
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
              htmlFor="title"
            >
              Text type
            </label>
            <select className="w-fit outline-none bg-[#1d1d1d] text-gray-100 h-12 px-2 rounded-lg text-xl shadow-lg">
              <option className="text-xl" value="Story">
                Story
              </option>
              <option className="text-xl" value="Poem">
                Poem
              </option>
              <option className="text-xl" value="Paper">
                Paper
              </option>
            </select>
          </div>
          <div className="flex flex-col pt-8">
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
              htmlFor="title"
            >
              Content
            </label>
            <TextareaAutosize
              cacheMeasurements
              minRows={10}
              className={`${PoppinsSemi.className} h-96 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 resize-none`}
            />
          </div>
          <div className="flex flex-col pt-8">
            <label
              className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
              htmlFor="title"
            >
              Tags
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
