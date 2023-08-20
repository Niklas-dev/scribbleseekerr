import { PoppinsLight, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="h-fit w-full bg-[#161616] flex flex-col justify-between">
      <div className="mx-4 px-2 py-2"></div>
      <div className="border-t-[1px] border-[#333333] px-2 mx-4 py-4 flex flex-row justify-between gap-4">
        <h4
          className={`${PoppinsSemi.className} text-gray-100 hidden sm:block `}
        >
          ScribbleSeekerr
        </h4>

        <div className="flex flex-row gap-4 w-full justify-between">
          <Link
            href={"/guidelines"}
            className={`${PoppinsLight.className} text-gray-100 cursor-pointer`}
          >
            Guidelines
          </Link>
          <a
            href="https://github.com/Niklas-dev"
            target="_blank"
            className={`${PoppinsLight.className} text-gray-100 cursor-pointer`}
          >
            by <b className={PoppinsRegular.className}>@Niklas-dev</b>
          </a>
        </div>
      </div>
    </footer>
  );
}
