"use client";
import React from "react";
import LottiePlayer from "./LottiePlayer";
import Link from "next/link";
import { PoppinsBold, PoppinsSemi } from "@/styles/fonts";
import { useAuth } from "@/providers/auth";

export default function MainContent() {
  const { user } = useAuth();
  return (
    <>
      <div
        className={`${PoppinsSemi.className} bg-gray-100 text-[#0e0e0e] h-fit rounded-full px-2 text-xs sm:text-sm lg:text-base `}
      >
        32 stories, peoms or papers and more are on the way!
      </div>
      <h1
        className={`${PoppinsBold.className} text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center h-fit rounded-full px-8 pt-4 w-fit xl:w-[65rem]`}
      >
        Join our community of writers. Share or explore any form of text
        instant!
      </h1>
      <p
        className={`${PoppinsSemi.className} text-gray-500 text-lg text-center h-fit rounded-full px-8 pt-8 w-fit xl:w-[55rem]`}
      >
        Unleash your creativity and join our community of wordsmiths! Share your
        stories and poems, or dive into a world of imagination with our endless
        collection of literary treasures. Welcome to a place where every word
        matters.
      </p>

      <div className="flex flex-row justify-center gap-2 py-4">
        {!user ? (
          <>
            <Link
              className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-1 transition-transform duration-300 hover:scale-95`}
              href="/login"
            >
              Login
            </Link>
            <Link
              className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-1 transition-transform duration-300 hover:scale-95`}
              href="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
            href="/texts"
          >
            Get Started
          </Link>
        )}
      </div>

      <LottiePlayer
        src="https://assets9.lottiefiles.com/packages/lf20_uqz3gmw3.json"
        classes="w-[400px] h-[400px] mt-8"
        autoplay
        loop
      />
    </>
  );
}
